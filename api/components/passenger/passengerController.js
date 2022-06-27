const passengerRepo = require("./passengerRepo.js");

async function getById(req, res, next) {
    try {
        let passenger = await passengerRepo.getById(req.params.id)
        res.send(passenger);
    }
    catch (err) {
        next(err)
    }
}

exports.getById = getById;