const passagerRepo = require("./passagerRepo.js");

async function getById(req, res, next) {
    try {
        let passager = await passagerRepo.getById(req.params.id)
        res.send(passager);
    }
    catch (err) {
        next(err)
    }
}

exports.getById = getById;