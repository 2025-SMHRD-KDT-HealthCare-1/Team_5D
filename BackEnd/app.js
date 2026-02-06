const express = require("express");
const cors = require("cors");

const { getCorsOrigin } = require("./config/env");
const logger = require("./middlewares/logger");
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const routes = require("./routes");

const app = express();

// Parse JSON bodies
app.use(express.json());

// CORS
app.use(
  cors({
    origin: getCorsOrigin(),
  })
);

// Request logging
app.use(logger);

// Routes
app.use("/api", routes);

// 404 handler
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

module.exports = app;
