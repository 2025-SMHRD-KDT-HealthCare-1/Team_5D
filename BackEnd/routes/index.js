const express = require("express");
const healthRoutes = require("./health");
const subjectsRoutes = require("./subjects");
const devicesRoutes = require("./devices");

const router = express.Router();

// Health check
router.use("/health", healthRoutes);
router.use("/subjects", subjectsRoutes);
router.use("/devices", devicesRoutes);

module.exports = router;
