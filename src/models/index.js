require('colors');
const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.dbname,
  config.username,
  config.password,
  {
    dialect: 'mysql',
    host: config.dbHost,
    port: config.dbPort,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize Connected'.green);
  } catch (error) {
    console.log('Sequelize Error'.red, error);
  }
})();

// define models
const BookedSeat = require('./BookedSeat')(sequelize);
const Ticket = require('./Ticket')(sequelize);
const ShowTime = require('./ShowTime')(sequelize);
const Movie = require('./Movie')(sequelize);
const User = require('./User')(sequelize);
const Seat = require('./Seat')(sequelize);
const Theater = require('./Theater')(sequelize);
const TheaterChain = require('./TheaterChain')(sequelize);
const TheaterBrand = require('./TheaterBrand')(sequelize);

//relationship
// TheaterBrand - TheaterChain
TheaterChain.belongsTo(TheaterBrand, { foreignKey: 'brandId', as: 'brand' });
TheaterBrand.hasMany(TheaterChain, { foreignKey: 'brandId', as: 'chains' });

// TheaterChain - Theater
Theater.belongsTo(TheaterChain, { foreignKey: 'chainId', as: 'chain' });
TheaterChain.hasMany(Theater, { foreignKey: 'chainId', as: 'theaters' });

// Theater - Seat
Seat.belongsTo(Theater, { foreignKey: 'theaterId', as: 'theater' });
Theater.hasMany(Seat, { foreignKey: 'theaterId', as: 'seats' });

// Theater - ShowTime: 1 - n
ShowTime.belongsTo(Theater, { foreignKey: 'theaterId', as: 'theater' });
Theater.hasMany(ShowTime, { foreignKey: 'theaterId', as: 'showTimes' });

// Movie - ShowTime: 1 - n
ShowTime.belongsTo(Movie, { foreignKey: 'movieId', as: 'movie' });
Movie.hasMany(ShowTime, { foreignKey: 'movieId', as: 'showTimes' });

// ShowTime - Ticket: 1 - n
Ticket.belongsTo(ShowTime, { foreignKey: 'showTimeId', as: 'showTimes' });
ShowTime.hasMany(Ticket, { foreignKey: 'showTimeId', as: 'ticket' });

// User - Ticket: 1 - n
Ticket.belongsTo(User, { foreignKey: 'userId', as: 'userBooked' });
User.hasMany(Ticket, { foreignKey: 'userId', as: 'ticket' });

// Ticket - BookedSeat: 1 - n
// BookedSeat.belongsTo(Ticket, { foreignKey: 'ticketId', as: 'ticket' });
// Ticket.hasMany(BookedSeat, { foreignKey: 'ticketId', as: 'bookedSeats' });

// Seat - BookedSeat: 1 - n
// BookedSeat.belongsTo(Seat, { foreignKey: 'seatId', as: 'seat' });
// Seat.hasMany(BookedSeat, { foreignKey: 'seatId', as: 'bookedSeats' });

// Ticket - Seat through BookedSeat
Ticket.belongsToMany(Seat, {
  as: 'bookedSeats',
  through: BookedSeat,
  foreignKey: 'ticketId',
});
Seat.belongsToMany(Ticket, {
  through: BookedSeat,
  as: 'tickets',
  foreignKey: 'seatId',
});



module.exports = {
  sequelize,
  TheaterBrand,
  TheaterChain,
  Theater,
  Seat,
  BookedSeat,
  User,
  Movie,
  ShowTime,
  Ticket,
};
