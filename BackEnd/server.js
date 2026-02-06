require("dotenv").config({ path: require("path").join(__dirname, ".env") });

const app = require("./app");
const { getPort } = require("./config/env");

const port = getPort();

app.listen(port, () => {
  console.log(`[server] listening on port ${port}`);
});
