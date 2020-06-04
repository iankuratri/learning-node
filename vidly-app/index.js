const Joi = require("@hapi/joi");
const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route for genres
app.use("/api/genres", genres);

// route for home
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
