const express = require("express");
const authorization = require("../../security/authorization.js");
const ticketController = require("./ticketController.js");
const ticketRouter = express.Router();

ticketRouter.use(express.json());

//Book ticket
ticketRouter.post(
  "/flight/:flightId",
  authorization.authorize(["GUEST"]),
  ticketController.createTicket
);

//Get tickets by user
ticketRouter.get(
  "/user/",
  authorization.authorize(["GUEST"]),
  ticketController.getByUser
);

//Get flight availability
ticketRouter.get(
  "/flight/:flightId",
  authorization.authorize(["FreeAccess"]),
  ticketController.getByFlight
);

ticketRouter.get(
  "/count",
  authorization.authorize(["ADMIN"]),
  ticketController.countAll
)

exports.ticketRouter = ticketRouter;
