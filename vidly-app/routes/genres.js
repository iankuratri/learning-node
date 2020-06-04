const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/vidly-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Schema
const genreSchema = new mongoose.Schema({
  name: { type: string, required: true },
});

// Model
const Genre = new mongoose.model("Genre", genreSchema);

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Thriller" },
];

// add a genre to db
async function createGenre() {
  const genre = new Genre({ name: "Sci-Fi" });
  try {
    const result = await genre.save();
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
createGenre();

// get genres
router.get("/", async (req, res) => {
  res.send(genres);
});

// get single genre using id as route param
router.get("/:id", (req, res) => {
  const genre = findGenre(req.params.id);
  if (!genre) return res.status(404).send("Genre with given ID was not found.");

  res.send(genre);
});

// adding new genre
router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);

  res.send(genre);
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
