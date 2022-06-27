const { Flight } = require("../api/components/flight/flight.js");
const { Passenger } = require("../api/components/passenger/passenger.js");
const { User } = require("../api/components/user/user.js");
const { Ticket } = require("../api/components/ticket/ticket.js");
const { sequelize } = require("./database.js");

sequelize.models.Flight = Flight;
sequelize.models.Passenger = Passenger;
sequelize.models.User = User;
sequelize.models.Ticket = Ticket;

async function syncronize() {
  await Ticket.sync();
  await User.sync();
  await Passenger.sync();
  await Flight.sync();

  Passenger.hasOne(Ticket, {
    onDelete: "CASCADE",
  });
  Ticket.belongsTo(Passenger, {
    onDelete: "CASCADE",
  });

  User.hasMany(Ticket);
  Ticket.belongsTo(User);

  Flight.hasMany(Ticket);
  Ticket.belongsTo(Flight);

  await Ticket.sync({ alter: true });
  await User.sync({ alter: true });
  await Passenger.sync({ alter: true });
  await Flight.sync({ alter: true });
}

setTimeout(syncronize, 100);
