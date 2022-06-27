const session = require("express-session");
const { Server } = require("socket.io");
const { countPassedFlights } = require("../components/flight/flightRepo");

const sessionMiddleware = session({
    secret: "Param pam pam pam I'm loving it",
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
})

function setSockets(server) {
    const io = new Server(server);

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));

    io.on("connection", (socket) => {
        sendPassedFlightsData(socket);
    });

    setInterval(() => sendPassedFlightsData(io), 50000);
}

async function sendPassedFlightsData(socket) {
    let passedFlights = await countPassedFlights();
    console.log(passedFlights);
    socket.emit("updatePassedFlights", { passedFlights });
}

exports.session = sessionMiddleware;
exports.setSockets = setSockets;