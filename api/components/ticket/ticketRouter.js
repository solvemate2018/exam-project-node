const express = require("express");
// import authorization from "../../security/authorization.js";
const ticketController = require("./ticketController.js");
const ticketRouter = express.Router();

ticketRouter.use(express.json());

ticketRouter.post(
  "/:flightId",
  //   authorization.authorize(["Admin", "Moderator"]),
  ticketController.createTicket
);

ticketRouter.get("/", ticketController.getByUser);

exports.ticketRouter = ticketRouter;
