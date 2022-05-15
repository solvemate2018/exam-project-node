const { Op } = require("sequelize");
const { Flight } = require("./flight.js");

async function createFlight(flight) {
  let result = await Flight.create({
    origin: flight.origin,
    destination: flight.destination,
    takeOff: flight.takeOff,
    duration: flight.duration,
    landing: flight.landing,
    rows: flight.rows ? flight.rows : 30,
    seats: flight.seats ? flight.seats : 6,
  });
  return await result;
}

async function fetchBy(origin, destination, startDate, finishDate) {
  return await Flight.findAll({
    where: {
      origin: origin,
      destination: destination,
      [Op.and]: [
        { takeOff: { [Op.gt]: startDate } },
        { takeOff: { [Op.lt]: finishDate } },
      ],
    },
  });
}

async function flightHasSeat(ticket_row, ticket_seat, flightId) {
  const flight = await Flight.findByPk(flightId);
  if (flight == null) throw new Error("There is no such flight");
  if (
    flight.rows < ticket_row ||
    ticket_row <= 0 ||
    flight.seats < ticket_seat ||
    ticket_seat <= 0
  ) {
    return false;
  }
  return true;
}

exports.createFlight = createFlight;
exports.fetchBy = fetchBy;
exports.flightHasSeat = flightHasSeat;
