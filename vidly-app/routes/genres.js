const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Model
const Genre = new mongoose.model("Genre", genreSchema);

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Thriller" },
];

// get genres
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    if (!genres) return res.res.status(404).send("No genre found.");
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
router.post("/", async (req, res) => {
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
router.put("/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Genre with given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

// delete genre using id as route param
router.delete("/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Genre with given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genres);
});

// common functions
function findGenre(id) {
  return genres.find((g) => g.id === parseInt(id));
}

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(genre);
}

module.exports = router;
