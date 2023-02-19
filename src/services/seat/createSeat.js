const { SugarError } = require('../../helpers/errors');
const { Seat, Theater } = require('../../models');
const { ErrTheaterNotFound } = require('../../pkg/appError');

module.exports = async ({ name, code, type, theaterId }) => {
  try {
    const theater = await Theater.findOne({ where: { id: theaterId } });

    if (!theater) {
      throw new SugarError(ErrTheaterNotFound);
    }

    const seat = await Seat.create({ name, code, type, theaterId });
    return seat;
  } catch (error) {
    throw new SugarError(error);
  }
};
