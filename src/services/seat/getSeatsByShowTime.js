const { Sequelize } = require('sequelize');
const { SugarError } = require('../../helpers/errors');
const { Seat, ShowTime, Theater } = require('../../models');
const { ErrShowTimeNotFound } = require('../../pkg/appError');

module.exports = async (showTimeId) => {
  try {
    const showTime = await ShowTime.findOne({ where: { id: showTimeId } });
    if (!showTime) {
      throw new SugarError(ErrShowTimeNotFound);
    }

    const theaterId = showTime.dataValues.theaterId;

    const seats = await Seat.findAll({
      where: { theaterId },
      attributes: {
        include: [
          [Sequelize.col('bookedSeats.ticket.user_id'), 'userId'],
          [Sequelize.col(`bookedSeats.ticket.user_id`), 'booked'],
        ],
        exclude: 'theaterId',
      },
      include: {
        association: 'bookedSeats',
        attributes: [],
        include: {
          where: { showTimeId },
          association: 'ticket',
          attributes: [],
        },
      },
    });
    const results = seats.map(({ dataValues: { booked, ...others } }) => ({
      ...others,
      booked: Boolean(booked),
    }));
    return results;
  } catch (error) {
    throw new SugarError(error);
  }
};
