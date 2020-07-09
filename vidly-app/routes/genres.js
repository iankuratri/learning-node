const auth = require("./../middleware/auth");
const admin = require("./../middleware/admin");
const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("./../models/genre");

// get all genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  if (!genres.length) return res.status(404).send("No genre found.");
  res.send(genres);
});

// get single genre using id as route param
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Genre with given ID was not found.");
  res.send(genre);
});

// adding new genre
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  const result = await genre.save();
  res.send(result);
});

// updating genre using id as route param
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre) return res.status(404).send("Genre with given ID was not found.");
  res.send(genre);
});

// delete genre using id as route param
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Genre with given ID was not found.");
  res.send(genre);
});

module.exports = router;
