function errorHandler(err, _req, res, _next) {
  const status = Number(err.status || 500);
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json({
    ok: false,
    message,
    details: err.details ?? undefined,
    stack: process.env.NODE_ENV !== "production" ? err.stack : undefined,
  });
}

module.exports = { errorHandler };

