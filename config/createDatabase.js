const { Flight } = require("../api/components/flight/flight.js");
const { Passager } = require("../api/components/passager/passager.js");
const { User } = require("../api/components/user/user.js");
const { Ticket } = require("../api/components/ticket/ticket.js");
const { sequelize } = require("./database.js");

sequelize.models.Flight = Flight;
sequelize.models.Passager = Passager;
sequelize.models.User = User;
sequelize.models.Ticket = Ticket;

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

async function syncronize() {
  await User.sync({ force: true });
  await Passager.sync({ force: true });
  await Flight.sync({ force: true });
  await Ticket.sync({ force: true });
}

setTimeout(syncronize, 2000);
