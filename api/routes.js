const express = require("express");
const router = express.Router();
const { session } = require("./middleware/socketsAndSession")
const { flightRouter } = require("./components/flight/flightRouter.js");
const { ticketRouter } = require("./components/ticket/ticketRouter.js");
const { userRouter } = require("./components/user/userRouter.js");
const { passagerRouter } = require("./components/passager/passagerRouter.js");
router.use(session);

router.use("/flight", flightRouter);
router.use("/ticket", ticketRouter);
router.use("/user", userRouter);
router.use("/passager", passagerRouter)

exports.router = router;
