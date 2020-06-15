const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("./../models/movie");
const { Genre } = require("./../models/genre");

// get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ name: 1 });
    if (!movies.length) return res.status(404).send("No movie found.");
    res.send(movies);
  } catch (err) {
    res.send(err.message);
  }
});

// get particular movie using id as route param
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie)
      return res.status(404).send("Movie with given ID was not found.");
    res.send(movie);
  } catch (err) {
    res.send(err.message);
  }
});

// add new movie
router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) res.status(400).send("Invalid genre.");

    const movie = new Movie({
      title: req.body.title,
      genre: { _id: genre._id, name: genre.name },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    });

    const result = await movie.save();
    res.send(result);
  } catch (err) {
    res.send(err.message);
  }
});

// delete movie using id as route param
router.delete("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if (!movie)
      return res.status(404).send("Movie with given ID was not found.");
    res.send(movie);
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
