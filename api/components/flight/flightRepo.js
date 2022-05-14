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

exports.createFlight = createFlight;
exports.fetchBy = fetchBy;
