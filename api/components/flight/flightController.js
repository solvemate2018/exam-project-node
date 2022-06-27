const flightRepo = require("./flightRepo.js");
const {
  validateString,
  validateFrequency,
  validateDate,
} = require("../../../config/validation.js");

async function scheduleFlight(req, res, next) {
  try {
    await validateString(req.body.flight.origin);
    await validateString(req.body.flight.destination);
    await validateFrequency(req.body.frequency);
    const firstFlight = new Date(req.body.startingFrom);

    let newFlight = {
      origin: req.body.flight.origin,
      destination: req.body.flight.destination,
      takeOff: firstFlight,
      duration: req.body.flight.duration,
      rows: req.body.flight.rows ? req.body.flight.rows : null,
      seats: req.body.flight.seats ? req.body.flight.seats : null,
    };
    await validateDate(firstFlight);

    let landingTime = new Date(firstFlight);
    landingTime.setMinutes(firstFlight.getMinutes() + newFlight.duration);
    switch (req.body.frequency) {
      case "Ones":
        newFlight.landing = landingTime;
        flightRepo.createFlight(newFlight);
        break;
      case "Ones per week":
        newFlight.landing = landingTime;
        while (new Date(req.body.finishingOn) > newFlight.takeOff) {
          await flightRepo.createFlight(newFlight);
          newFlight.takeOff.setDate(newFlight.takeOff.getDate() + 7);
          newFlight.landing.setDate(newFlight.landing.getDate() + 7);
        }
        break;
      case "Ones per day":
        newFlight.landing = landingTime;
        while (new Date(req.body.finishingOn) > newFlight.takeOff) {
          await flightRepo.createFlight(newFlight);
          newFlight.takeOff.setDate(newFlight.takeOff.getDate() + 1);
          newFlight.landing.setDate(newFlight.landing.getDate() + 1);
        }
        break;
    }
    res.send({ msg: "Successfully created" });
  } catch (error) {
    next(error);
  }
}

async function getBy(req, res, next) {
  try {
    const origin = req.body.origin;
    const destination = req.body.destination;
    const startDate = req.body.startDate;
    const finishDate = req.body.finishDate;

    await validateString(origin);
    await validateString(destination);
    await validateDate(startDate);
    await validateDate(finishDate);

    const flights = await flightRepo.fetchBy(
      origin,
      destination,
      startDate,
      finishDate
    );

    res.send(flights);
  } catch (error) {
    next(error);
  }
}


async function getRoutes(req, res, next) {
  try {
    const routes = await flightRepo.fetchRoutes();
    let uniqueRoutes = [];
    routes.forEach(route => {
      let isUnique = true;
      uniqueRoutes.forEach(uniqueRoute => {
        if (uniqueRoute.origin == route.origin && uniqueRoute.destination == route.destination) {
          isUnique = false;
        }
      })
      if (isUnique)
        uniqueRoutes.push(route);
    });
    res.send(uniqueRoutes);

  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const flight = await flightRepo.getByFlightId(req.params.id);

    res.send(flight)
  }
  catch (error) {
    next(error);
  }
}

async function countFuture(req, res, next) {
  try {
    const count = await flightRepo.countFuture();

    res.send({ count: count })
  }
  catch (error) {
    next(error);
  }
}

async function countPast(req, res, next) {
  try {
    const count = await flightRepo.countPassedFlights();

    res.send({ count: count })
  }
  catch (error) {
    next(error);
  }
}

async function getLastTen(req, res, next) {
  try {
    const flights = await flightRepo.getLastTen();

    res.send({ flights: flights })
  }
  catch (error) {
    next(error);
  }
}

async function getNextTen(req, res, next) {
  try {
    const flights = await flightRepo.getNextTen();

    res.send({ flights: flights })
  }
  catch (error) {
    next(error);
  }
}

exports.getRoutes = getRoutes;
exports.scheduleFlight = scheduleFlight;
exports.getBy = getBy;
exports.getById = getById;
exports.countFuture = countFuture;
exports.countPast = countPast;
exports.getLastTen = getLastTen;
exports.getNextTen = getNextTen;