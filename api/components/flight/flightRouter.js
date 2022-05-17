const express = require("express");
const authorization = require("../../security/authorization.js");
const flightController = require("./flightController.js");
const flightRouter = express.Router();

flightRouter.use(express.json());

flightRouter.post(
  "/",
  authorization.authorize(["Admin"]),
  flightController.scheduleFlight
);

flightRouter.get(
  "/",
  authorization.authorize(["FreeAccess"]),
  flightController.getBy
);

exports.flightRouter = flightRouter;
