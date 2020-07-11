const winston = require("winston");
const express = require("express");
const app = express();

// for logging errors
require("./startup/logging")();
// for loading routes
require("./startup/routes")(app);
// for connecting to db
require("./startup/db")();

require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // console.log(`Listening on port ${port}...`);
  winston.info(`Listening on port ${port}...`);
});
