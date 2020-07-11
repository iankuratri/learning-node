const express = require("express");
const morgan = require("morgan");
const home = require("../routes/home");
const genres = require("../routes/genres");
const customers = require("../routes/customers");
const movies = require("../routes/movies");
const rentals = require("../routes/rentals");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  // parses incoming requests with JSON payloads
  app.use(express.json());
  // parses incoming requests with urlencoded payloads
  app.use(express.urlencoded({ extended: true }));
  // HTTP request logger.
  app.use(morgan("tiny"));
  // routes
  app.use("/", home);
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  // middleware for error handling
  app.use(error);
};
