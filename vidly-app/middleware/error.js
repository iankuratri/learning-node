function error(err, req, res, next) {
  // Log the exception
  console.error(err);
  res.status(500).send("Something went wrong.");
}

module.exports = error;
