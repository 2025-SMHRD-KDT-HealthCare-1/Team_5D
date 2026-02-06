// Environment helpers
function getPort() {
  return Number(process.env.PORT) || 3000;
}

function getCorsOrigin() {
  const origin = process.env.CORS_ORIGIN;
  if (!origin || origin === "*") {
    return "*";
  }

  // Allow comma-separated list in env
  return origin.split(",").map((value) => value.trim());
}

module.exports = {
  getPort,
  getCorsOrigin,
};
