const express = require("express");
// import authorization from "../../security/authorization.js";
const flightController = require("./flightController.js");
const flightRouter = express.Router();

flightRouter.use(express.json());

flightRouter.post(
  "/",
  //   authorization.authorize(["Admin", "Moderator"]),
  flightController.scheduleFlight
);

flightRouter.get("/", flightController.getBy);

exports.flightRouter = flightRouter;
