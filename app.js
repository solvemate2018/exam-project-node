const { sequelize, setAssociations } = require("./config/database.js");
const { app } = require("./api/server.js");
const { setSockets } = require("./api/middleware/socketsAndSession");
const middleware = require("./api/middleware/middleware");
const http = require("http");

const PORT = process.env.PORT || 8000;

middleware.setMiddleware(app);

const server = http.createServer(app);
setSockets(server);
server.listen(PORT, console.log(`Server started on port ${PORT}`));
