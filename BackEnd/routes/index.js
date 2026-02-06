const express = require("express");
const healthRoutes = require("./health");

const router = express.Router();

// Health check
router.use("/health", healthRoutes);

module.exports = router;
