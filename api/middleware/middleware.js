const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const routes = require("../routes.js");
const errorHandler = require("../errorHandling/errorHandler.js");
const cors = require("cors");

async function setMiddleware(app) {
  app.use(express.static("../public"));
  console.log("Public folder added to server!");

  app.use(helmet());
  console.log("Helmet is up and running on the server!");

  const baseLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  app.use(baseLimiter);
  app.use("/users/auth", authLimiter);
  console.log("Rate limiters are up and running on the server!");

  app.use(cors());
  app.use(routes.router);
  console.log("All routes have been added to server!");

  app.use(errorHandler.defaultHandling);
}

exports.setMiddleware = setMiddleware;
