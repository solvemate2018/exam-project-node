function defaultHandling(err, req, res, next) {
  res.status(500);
  res.send({ error: err.message });
}
exports.defaultHandling = defaultHandling;
