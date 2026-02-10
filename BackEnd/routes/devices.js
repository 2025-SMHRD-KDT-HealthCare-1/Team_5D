const express = require("express");
const { deleteDevice } = require("../controllers/devicesController");

const router = express.Router();

// DELETE /api/devices/:device_id
router.delete("/:device_id", deleteDevice);

module.exports = router;
