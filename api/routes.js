const express = require("express");
const session = require("express-session");
const router = express.Router();
const { flightRouter } = require("./components/flight/flightRouter.js");
const { ticketRouter } = require("./components/ticket/ticketRouter.js");
router.use(
  session({
    secret: "Param pam pam pam I'm loving it",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

router.use("/flight", flightRouter);
router.use("/ticket", ticketRouter);

exports.router = router;
