const ticketRepo = require("./ticketRepo.js");
const passagerRepo = require("../passager/passagerRepo.js");
const flightRepo = require("../flight/flightRepo.js");
const userRepo = require("../user/userRepo.js");
const { validateString } = require("../../../config/validation.js");

async function createTicket(req, res, next) {
  try {
    let session = req.session;
    const ticket = req.body.ticket;
    const passager = req.body.passager;
    const flightId = req.params.flightId;
    const userId = session.user.id;
    await validateTicketData(ticket, passager, flightId, userId);

    await ticketRepo.isAvailable(
      ticket.ticket_row,
      ticket.ticket_seat,
      flightId
    );

    await ticketRepo.bookTicket(ticket, passager, flightId, userId);
    res.send({ msg: "Succesfully created" });
  } catch (error) {
    next(error);
  }
}

async function getByUser(req, res, next) {
  try {
    res.send(await ticketRepo.getByUser(req.session.user.id));
  } catch (error) {
    next(error);
  }
}

async function validateTicketData(ticket, passager, flightId, userId) {
  await validateString(passager.firstName);
  await validateString(passager.lastName);
  if (passager.documentType != "Passport" && passager.documentType != "ID card")
    throw new Error("The document type is not valid");
  if (!(await userRepo.userExists(userId)))
    throw new Error("There is no such user");
  if (
    !(await flightRepo.flightHasSeat(
      ticket.ticket_row,
      ticket.ticket_seat,
      flightId
    ))
  )
    throw new Error("This flight does not have such seat");
}

async function getByFlight(req, res, next) {
  try {
    const flight = await flightRepo.getByFlightId(req.params.flightId);
    const rows = flight.rows;
    const seats = flight.seats;

    const takenSeats = await ticketRepo.getByFlightId(flight.id);

    let tickets = [];

    let counter = 0;
    for (let row = 1; row <= rows; row++) {
      for (let seat = 1; seat <= seats; seat++) {
        let isTaken = false;
        takenSeats.forEach(takenSeat => {
          if (takenSeat.ticket_row == row && takenSeat.ticket_seat == seat) {
            isTaken = true;
          }
        });
        tickets[counter] = { row: row, seat: seat, available: !isTaken }
        counter++;
      }
    }

    res.send(tickets);
  }
  catch (err) {
    next(err)
  }
}

async function countAll(req, res, next) {
  try {
    const count = await ticketRepo.countAll();

    res.send({ count: count })
  }
  catch (err) {
    next(err)
  }
}

exports.getByFlight = getByFlight;
exports.createTicket = createTicket;
exports.getByUser = getByUser;
exports.countAll = countAll;
