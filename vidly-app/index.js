const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const express = require("express");
const app = express();

// for logging errors
require("./startup/logging")();
// for loading routes
require("./startup/routes")(app);
// for connecting to db
require("./startup/db")();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
