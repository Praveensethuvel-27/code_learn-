require("dotenv").config();

const { createApp } = require("./app");
const { connectDb } = require("./config/db");

const app = createApp();
const port = Number(process.env.PORT || 5000);

// ── Bind the port FIRST so Render detects an open port ──
const server = app.listen(port, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on port ${port}`);
});

// ── Then connect to MongoDB ──
connectDb(process.env.MONGO_URI)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log("MongoDB connected ✓");
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error("MongoDB connection error:", err.message);
    // Keep the server running so Render doesn't restart-loop;
    // individual routes will fail gracefully with 500 errors.
  });

