const express = require("express");
const authorization = require("../../security/authorization.js");
const userController = require("./userController.js");
const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post(
  "/register",
  authorization.authorize(["FreeAccess"]),
  userController.register
);

userRouter.post(
  "/login",
  authorization.authorize(["FreeAccess"]),
  userController.login
);

userRouter.get(
  "/logout",
  authorization.authorize(["FreeAccess"]),
  userController.logout
);

exports.userRouter = userRouter;
