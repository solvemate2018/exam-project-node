const express = require("express");
const authorization = require("../../security/authorization.js");
const passengerController = require("./passengerController.js");
const passengerRouter = express.Router();

passengerRouter.use(express.json());

//Get flight availability
passengerRouter.get(
    "/:id",
    authorization.authorize(["GUEST"]),
    passengerController.getById
);

exports.passengerRouter = passengerRouter;
