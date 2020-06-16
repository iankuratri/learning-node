const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const { Rental, validateRental } = require("./../models/rental");
const { Customer } = require("./../models/customer");
const { Movie } = require("./../models/movie");

Fawn.init(mongoose);

// getting all rentals
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    if (!rentals.length) return res.status(404).send("No rental found.");
    res.send(rentals);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// get particular rental using id as route param
router.get("/:id", async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental)
      return res.status(404).send("Rental with given ID was not found.");
    res.send(rental);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// adding new rentals
router.post("/", async (req, res) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customerId.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send("Invalid movieId.");

    if (movie.numberInStock === 0)
      return res.status(400).send("Movie not in stock.");

    const rental = new Rental({
      customer: {
        name: customer.name,
        phone: customer.phone,
        isGold: customer.isGold,
        _id: customer._id,
      },
      movie: {
        title: movie.title,
        dailyRentalRate: movie.dailyRentalRate,
        _id: movie._id,
      },
    });

    /**
     * To handle Transactions (saving two things in db at once) we
     * are using fawn library here, instead of the code below.
     *
     * const result = rental.save();
     * movie.numberInStock--;
     * movie.save();
     */

    const task = Fawn.Task();

    task
      .save("rentals", rental)
      .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
      .run();

    res.send(rental);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err);
  }
});

module.exports = router;
