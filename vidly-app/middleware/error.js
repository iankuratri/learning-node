const winston = require("winston");

function error(err, req, res, next) {
  console.error(err);
  // Logging the exception

  winston.error(err.message, err);

  /**
   * error: 0,
   * warn: 1,
   * info: 2,
   * http: 3,
   * verbose: 4,
   * debug: 5,
   * silly: 6
   */

  res.status(500).send("Something went wrong.");
}

module.exports = error;
