const auth = require("./../middleware/auth");
const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("./../models/genre");

// get all genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    if (!genres.length) return res.status(404).send("No genre found.");
    res.send(genres);
  } catch (err) {
    res.send(err.message);
  }
});

// get single genre using id as route param
router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre)
      return res.status(404).send("Genre with given ID was not found.");
    res.send(genre);
  } catch (err) {
    res.send(err.message);
  }
});

// adding new genre
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  try {
    const result = await genre.save();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

// updating genre using id as route param
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!genre)
      return res.status(404).send("Genre with given ID was not found.");
    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// delete genre using id as route param
router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre)
      return res.status(404).send("Genre with given ID was not found.");
    res.send(genre);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
