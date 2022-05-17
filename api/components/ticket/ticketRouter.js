const express = require("express");
const authorization = require("../../security/authorization.js");
const ticketController = require("./ticketController.js");
const ticketRouter = express.Router();

ticketRouter.use(express.json());

ticketRouter.post(
  "/flight/:flightId/user/:userId",
  authorization.authorize(["GUEST"], true),
  ticketController.createTicket
);

ticketRouter.get(
  "/user/:userId",
  authorization.authorize(["GUEST"], true),
  ticketController.getByUser
);

exports.ticketRouter = ticketRouter;
