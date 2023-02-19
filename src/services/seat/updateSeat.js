const { SugarError } = require('../../helpers/errors');
const { Seat, Theater } = require('../../models');
const { ErrSeatNotFound, ErrTheaterNotFound } = require('../../pkg/appError');

module.exports = async (id, args) => {
  try {
    const seat = await Seat.findOne({ where: { id } });

    if (!seat) {
      throw new SugarError(ErrSeatNotFound);
    }

    if (args.theaterId) {
      const theater = await Theater.findOne({ where: { id: args.theaterId } });
      if (!theater) {
        throw new SugarError(ErrTheaterNotFound);
      }
    }
    seat.set(args);
    await seat.save();

    return seat;
  } catch (error) {
    throw new SugarError(error);
  }
};
