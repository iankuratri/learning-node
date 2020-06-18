const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/vidly-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set("useFindAndModify", false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route for home
const home = require("./routes/home");
app.use("/", home);

// route for genres
const genres = require("./routes/genres");
app.use("/api/genres", genres);

// route for customers
const customers = require("./routes/customers");
app.use("/api/customers", customers);

// route for movies
const movies = require("./routes/movies");
app.use("/api/movies", movies);

// route for rentals
const rentals = require("./routes/rentals");
app.use("/api/rentals", rentals);

// route for users
const users = require("./routes/users");
app.use("/api/users", users);

// route for auth
const auth = require("./routes/auth");
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
