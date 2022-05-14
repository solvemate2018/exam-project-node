const Joi = require("joi");

async function validateString(stringToCheck) {
  try {
    Joi.assert(stringToCheck, Joi.string().min(3).max(30));
  } catch (error) {
    throw error;
  }
}
async function validateDate(dateToCheck) {
  try {
    Joi.assert(
      dateToCheck,
      Joi.date().min("now").max(new Date("2030", "12", "31"))
    );
  } catch (error) {
    throw error;
  }
}
async function validateFrequency(frequencyToCheck) {
  try {
    Joi.assert(
      frequencyToCheck,
      Joi.string().valid("Ones", "Ones per week", "Ones per day")
    );
  } catch (error) {
    throw error;
  }
}
async function validateEmail(emailToCheck) {
  try {
    Joi.assert(emailToCheck, Joi.string().email());
  } catch (error) {
    throw error;
  }
}

exports.validateString = validateString;
exports.validateDate = validateDate;
exports.validateFrequency = validateFrequency;
exports.validateEmail = validateEmail;
