const mongoose = require("mongoose");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");

mongoose
  .connect("mongodb://localhost:27017/vidly-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route for genres
app.use("/api/genres", genres);

// route for home
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
