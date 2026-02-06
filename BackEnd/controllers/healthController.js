const healthService = require("../services/healthService");

// Health check controller
function getHealth(req, res, next) {
  try {
    const result = healthService.check();
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getHealth,
};
