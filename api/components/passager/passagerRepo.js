const { Passager } = require("./passager.js");

async function documentExist(docId) {
  const passager = await Passager.findOne({ where: { documentId: docId } });
  if (passager == null) return false;
  return true;
}

async function getById(id) {
  const passager = await Passager.findByPk(id);
  if (passager != undefined) return passager
  else
    throw new Error("There is no passager with such ID")
}

exports.documentExist = documentExist;
exports.getById = getById;
