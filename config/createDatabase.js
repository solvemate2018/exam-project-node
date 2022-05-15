const { Flight } = require("../api/components/flight/flight.js");
const { Passager } = require("../api/components/passager/passager.js");
const { User } = require("../api/components/user/user.js");
const { Ticket } = require("../api/components/ticket/ticket.js");
const { sequelize } = require("./database.js");

sequelize.models.Flight = Flight;
sequelize.models.Passager = Passager;
sequelize.models.User = User;
sequelize.models.Ticket = Ticket;

async function syncronize() {
  await Ticket.sync();
  await User.sync();
  await Passager.sync();
  await Flight.sync();

  Passager.hasOne(Ticket, {
    onDelete: "CASCADE",
  });
  Ticket.belongsTo(Passager, {
    onDelete: "CASCADE",
  });

  User.hasMany(Ticket);
  Ticket.belongsTo(User);

  Flight.hasMany(Ticket);
  Ticket.belongsTo(Flight);

  await Ticket.sync({ alter: true });
  await User.sync({ alter: true });
  await Passager.sync({ alter: true });
  await Flight.sync({ alter: true });
}

setTimeout(syncronize, 100);
