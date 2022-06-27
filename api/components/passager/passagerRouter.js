const express = require("express");
const authorization = require("../../security/authorization.js");
const passagerController = require("./passagerController.js");
const passagerRouter = express.Router();

passagerRouter.use(express.json());

//Get flight availability
passagerRouter.get(
    "/:id",
    authorization.authorize(["GUEST"]),
    passagerController.getById
);

exports.passagerRouter = passagerRouter;
