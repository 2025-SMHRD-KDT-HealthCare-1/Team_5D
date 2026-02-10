const devicesService = require("../services/devicesService");

// Soft delete device (no hard delete)
function deleteDevice(req, res, next) {
  try {
    const { device_id: deviceId } = req.params;
    const result = devicesService.softDeleteDevice(deviceId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  deleteDevice,
};
