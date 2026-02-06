// 404 handler
function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: "Not Found",
  });
}

// Common error handler
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  console.error("[error]", err);

  res.status(statusCode).json({
    error: err.message || "Internal Server Error",
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
