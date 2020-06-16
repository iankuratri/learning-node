const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  isGold: { type: Boolean, required: true },
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const rentalSchema = new mongoose.Schema({
  customer: { type: customerSchema, required: true },
  movie: { type: movieSchema, required: true },
  dateOut: { type: Date, required: true, default: Date.now },
  dateReturned: { type: Date },
  rentalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
  });

  return schema.validate(rental);
}

module.exports = {
  Rental,
  validateRental,
};
