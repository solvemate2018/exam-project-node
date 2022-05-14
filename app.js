const { sequelize } = require("./config/database.js");
const server = require("./api/server.js");
const middleware = require("./api/middleware/middleware");

middleware.setMiddleware(server.app);
