const { Sequelize } = require('sequelize');
const { SugarError } = require('../../helpers/errors');
const { BookedSeat, Ticket, ShowTime, Seat, User } = require('../../models');
const {
  ErrShowTimeNotFound,
  ErrSeatNotFound,
  ErrUserNotFound,
  ErrSeatBooked,
} = require('../../pkg/appError');

module.exports = async ({ userId, showTimeId, seats }) => {
  // seat: { price, seat_id }
  try {
    const seatIds = seats.map(({ seatId }) => seatId);

    // check seat already booked
    const bSeats = await Seat.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: seatIds,
        },
      },
      include: {
        where: { showTimeId },
        association: 'tickets',
        attributes: [],
      },
    });
    if (bSeats.length) {
      throw new SugarError(ErrSeatBooked);
    }

    // check showt time exist
    const showTime = await ShowTime.findOne({ where: { id: showTimeId } });
    if (!showTime) {
      throw new SugarError(ErrShowTimeNotFound);
    }

    // check seat exist
    const checkSeats = await Seat.findAll({
      where: {
        theaterId: showTime.dataValues.theaterId,
        id: {
          [Sequelize.Op.in]: seatIds,
        },
      },
    });

    if (!checkSeats || checkSeats.length < seats.length) {
      throw new SugarError(ErrSeatNotFound);
    }

    // check user exist
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      throw new SugarError(ErrUserNotFound);
    }

    // create ticket
    const ticket = await Ticket.create({ userId, showTimeId });
    for (const { seatId, price } of seats) {
      await ticket.addBookedSeat(seatId, { through: { price } });
    }

    return ticket;
  } catch (error) {
    throw new SugarError(error);
  }
};
