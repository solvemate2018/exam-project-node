const express = require("express");
const authorization = require("../../security/authorization.js");
const flightController = require("./flightController.js");
const flightRouter = express.Router();

flightRouter.use(express.json());

flightRouter.get("/routes", authorization.authorize(["FreeAccess"]), flightController.getRoutes)

flightRouter.post(
  "/",
  authorization.authorize(["ADMIN"]),
  flightController.scheduleFlight
);

flightRouter.post(
  "/fetchBy",
  authorization.authorize(["FreeAccess"]),
  flightController.getBy
);

flightRouter.get("/id/:id", authorization.authorize(["FreeAccess"]),
  flightController.getById);

flightRouter.get("/countFuture", authorization.authorize(["ADMIN"]),
  flightController.countFuture)

flightRouter.get("/countPast", authorization.authorize(["ADMIN"]),
  flightController.countPast);

flightRouter.get("/past", authorization.authorize(["ADMIN"]),
  flightController.getLastTen);

flightRouter.get("/future", authorization.authorize(["ADMIN"]),
  flightController.getNextTen);

exports.flightRouter = flightRouter;
