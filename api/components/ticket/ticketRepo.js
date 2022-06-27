const { Ticket } = require("./ticket.js");
const { Passenger } = require("../passenger/passenger.js");

async function isAvailable(ticket_row, ticket_seat, flightId) {
  const ticket = await Ticket.findOne({
    where: {
      ticket_row: ticket_row,
      ticket_seat: ticket_seat,
      FlightId: flightId,
    },
  });
  if (ticket != null) {
    throw new Error("There is already a ticket for this place");
  }
}

async function bookTicket(ticket, passenger, flightId, userId) {
  let dbpassenger;
  if (await Passenger.count({
    where: {
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      documentType: passenger.documentType,
      documentId: passenger.documentId,
    }
  }) == 0) {
    dbpassenger = await Passenger.create({
      firstName: passenger.firstName,
      lastName: passenger.lastName,
      documentType: passenger.documentType,
      documentId: passenger.documentId,
    });
  }
  else {
    dbpassenger = await Passenger.findOne({
      where: {
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        documentType: passenger.documentType,
        documentId: passenger.documentId,
      }
    })
  }

  const dbticket = await Ticket.create({
    ticket_row: ticket.ticket_row,
    ticket_seat: ticket.ticket_seat,
    UserId: userId,
    FlightId: flightId,
    PassengerId: dbpassenger.id,
  });
}

async function getByUser(userId) {
  const tickets = await Ticket.findAll({
    where: {
      UserId: userId,
    },
  });
  return await tickets;
}

async function getByFlightId(flightId) {
  const tickets = await Ticket.findAll({
    where: {
      FlightId: flightId,
    },
  });
  return await tickets;
}

async function countAll() {
  const ticketsCount = await Ticket.count();
  return ticketsCount;
}

exports.isAvailable = isAvailable;
exports.bookTicket = bookTicket;
exports.getByUser = getByUser;
exports.getByFlightId = getByFlightId;
exports.countAll = countAll;
