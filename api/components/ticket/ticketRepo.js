const { Op } = require("sequelize");
const { Flight } = require("../flight/flight.js");
const { Ticket } = require("./ticket.js");
const { Passager } = require("../passager/passager.js");

async function isAvailable(ticket_row, ticket_seat, flightId) {
  let ticket = await Ticket.findOne({
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

async function bookTicket(ticket, passager, flightId) {
  const passager = await Passager.create({
    firstName: passager.firstName,
    lastName: passager.lastName,
    documentType: passager.documentType,
    documentId: passager.documentId,
  });

  const ticket = await Ticket.create({
    ticket_row: ticket.ticket_row,
    ticket_seat: ticket_seat,
    UserId: ticket.UserId,
    FlightId: flightId,
    PassagerId: passager.id,
  });
}

exports.isAvailable = isAvailable;
exports.bookTicket = bookTicket;
