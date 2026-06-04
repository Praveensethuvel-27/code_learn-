const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const rateLimit = require("express-rate-limit");

const { notFound } = require("./middleware/notFound");
const { errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth.routes");
const languageRoutes = require("./routes/languages.routes");
const lessonRoutes = require("./routes/lessons.routes");
const problemRoutes = require("./routes/problems.routes");
const submissionRoutes = require("./routes/submissions.routes");
const adminRoutes = require("./routes/admin.routes");
const savedCodeRoutes = require("./routes/savedcode.routes");

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN?.split(",").map((s) => s.trim()) ?? true,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(cookieParser());
  app.use(morgan("dev"));

  app.set("trust proxy", 1);
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 300,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    }),
  );

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "backend", ts: new Date().toISOString() });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/languages", languageRoutes);
  app.use("/api/lessons", lessonRoutes);
  app.use("/api/problems", problemRoutes);
  app.use("/api/submissions", submissionRoutes);
  app.use("/api/savedcodes", savedCodeRoutes);
  app.use("/api/admin", adminRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

