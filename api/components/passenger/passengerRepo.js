const { Passenger } = require("./passenger.js");

async function documentExist(docId) {
  const passenger = await Passenger.findOne({ where: { documentId: docId } });
  if (passenger == null) return false;
  return true;
}

async function getById(id) {
  const passenger = await Passenger.findByPk(id);
  if (passenger != undefined) return passenger
  else
    throw new Error("There is no passenger with such ID")
}

exports.documentExist = documentExist;
exports.getById = getById;
