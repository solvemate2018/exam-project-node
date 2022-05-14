const flightRepo = require("./flightRepo.js");
const {
  validateString,
  validateFrequency,
  validateDate,
} = require("../../../config/validation.js");

async function scheduleFlight(req, res, next) {
  try {
    validateString(req.body.flight.origin);
    validateString(req.body.flight.destination);
    validateFrequency(req.body.frequency);
    const firstFlight = new Date(req.body.startingFrom);

    let newFlight = {
      origin: req.body.flight.origin,
      destination: req.body.flight.destination,
      takeOff: firstFlight,
      duration: req.body.flight.duration,
      rows: req.body.flight.rows ? req.body.flight.rows : null,
      seats: req.body.flight.seats ? req.body.flight.seats : null,
    };

    validateDate(firstFlight);

    let landingTime = new Date(firstFlight);
    landingTime.setMinutes(firstFlight.getMinutes() + newFlight.duration);
    switch (req.body.frequency) {
      case "Ones":
        newFlight.landing = landingTime;
        flightRepo.createFlight(newFlight);
        break;
      case "Ones per week":
        newFlight.landing = landingTime;
        while (req.body.finishingOn > newFlight.takeOff) {
          flightRepo.createFlight(newFlight);
          newFlight.takeOff.setDate(newFlight.takeOff.getDate + 7);
          newFlight.landing.setDate(newFlight.landing.getDate + 7);
        }
        break;
      case "Ones per day":
        newFlight.landing = landingTime;
        while (req.body.finishingOn > newFlight.takeOff) {
          flightRepo.createFlight(newFlight);
          newFlight.takeOff.setDate(newFlight.takeOff.getDate + 1);
          newFlight.landing.setDate(newFlight.landing.getDate + 1);
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

    validateString(origin);
    validateString(destination);
    validateDate(startDate);
    validateDate(finishDate);

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

exports.scheduleFlight = scheduleFlight;
exports.getBy = getBy;
