const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const routes = require("../routes.js");
const errorHandler = require("../errorHandling/errorHandler.js");
const cors = require("cors");
const path = require("path")


async function setMiddleware(app) {
  app.use(express.urlencoded({ extended: true }))

  app.use(express.static(path.resolve("./client/airExam/public")))
  app.use(helmet({
    contentSecurityPolicy: false,
  }));
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

  app.use(cors());
  app.use(routes.router);

  app.use(errorHandler.defaultHandling);
}

exports.setMiddleware = setMiddleware;
