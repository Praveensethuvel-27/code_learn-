const { HttpError } = require("../utils/httpError");

function notFound(_req, _res, next) {
  next(new HttpError(404, "Route not found"));
}

module.exports = { notFound };

