const { Passager } = require("./passager.js");

async function documentExist(docId) {
  const passager = await Passager.findOne({ where: { documentId: docId } });
  if (passager == null) return false;
  return true;
}

exports.documentExist = documentExist;
