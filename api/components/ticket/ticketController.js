const ticketRepo = require("./ticketRepo.js");
const {
  validateString,
  validateFrequency,
  validateDate,
} = require("../../../config/validation.js");

async function createTicket(req, res, next) {
  try {
    const ticket = req.body.ticket;
    const passager = req.body.passager;
    const flightId = req.params.flightId;
    validateTicketData(ticket, passager, flightId);

    ticketRepo.isAvailable(ticket.ticket_row, ticket.ticket_seat, flightId);

    ticketRepo.bookTicket(ticket, passager, flightId);
  } catch (error) {
    next(error);
  }
}

async function getByUser(req, res, next) {
  //To be implemented
}

async function validateTicketData(ticket, passager, flightId) {
  //To be implemented
}

exports.createTicket = createTicket;
exports.getByUser = getByUser;
