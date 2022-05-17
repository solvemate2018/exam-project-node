const ticketRepo = require("./ticketRepo.js");
const passagerRepo = require("../passager/passagerRepo.js");
const flightRepo = require("../flight/flightRepo.js");
const userRepo = require("../user/userRepo.js");
const { validateString } = require("../../../config/validation.js");

async function createTicket(req, res, next) {
  try {
    const ticket = req.body.ticket;
    const passager = req.body.passager;
    const flightId = req.params.flightId;
    const userId = req.params.userId;
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
    if (!userRepo.userExists(req.params.userId))
      throw new Error("Invalid user ID");
    res.send(await ticketRepo.getByUser(req.params.userId));
  } catch (error) {
    next(error);
  }
}

async function validateTicketData(ticket, passager, flightId, userId) {
  await validateString(passager.firstName);
  await validateString(passager.lastName);
  if (passager.documentType != "Passport" && passager.documentType != "ID card")
    throw new Error("The document type is not valid");
  if (await passagerRepo.documentExist(passager.documentId))
    throw new Error("This document is already in use by another passager");
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

exports.createTicket = createTicket;
exports.getByUser = getByUser;
