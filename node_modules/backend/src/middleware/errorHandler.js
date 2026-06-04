const { ZodError } = require("zod");

function formatZodMessage(err) {
  return err.issues
    .map((i) => {
      const field = i.path?.[0];
      if (field === "sourceCode" && i.code === "too_small") {
        return "Source code cannot be empty. Write or paste code before running.";
      }
      if (field === "language") return `Unsupported language: ${i.message}`;
      return i.message;
    })
    .join(" ");
}

function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      ok: false,
      message: formatZodMessage(err),
      details: err.issues,
    });
  }

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

