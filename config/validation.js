const Joi = require("joi");

async function validateString(stringToCheck) {
  Joi.assert(stringToCheck, Joi.string().min(3).max(30));
}
async function validateDate(dateToCheck) {
  Joi.assert(
    dateToCheck,
    Joi.date().min("now").max(new Date("2030", "12", "31"))
  );
}
async function validateFrequency(frequencyToCheck) {
  Joi.assert(
    frequencyToCheck,
    Joi.string().valid("Ones", "Ones per week", "Ones per day")
  );
}
async function validateEmail(emailToCheck) {
  Joi.assert(emailToCheck, Joi.string().email());
}

async function validatePassword(password) {
  //To be completed
}

exports.validateString = validateString;
exports.validateDate = validateDate;
exports.validateFrequency = validateFrequency;
exports.validateEmail = validateEmail;
exports.validatePassword = validatePassword;
