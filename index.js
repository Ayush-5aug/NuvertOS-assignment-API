const server = require("./utils/app");
const dotenv = require('dotenv').config();
const app = server.createServer();
const db = require("./models");

db.sequelize.sync().then((res) => {
  app.listen(
    process.env.PORT || 5000,
    console.log(`server running on port ${process.env.PORT}`)
  );
});