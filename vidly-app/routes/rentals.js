const express = require("express");
const router = express.Router();
const { Rental, validateRental } = require("./../models/rental");
const { Customer } = require("./../models/customer");
const { Movie } = require("./../models/movie");

// getting all rentals
router.get("/", async (req, res) => {
  try {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    if (!rentals.length) return res.status(404).send("No rental found.");
    res.send(rentals);
  } catch (err) {
    res.send(err.message);
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

    const result = rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
  } catch (err) {
    res.send(err.message);
  }
});
