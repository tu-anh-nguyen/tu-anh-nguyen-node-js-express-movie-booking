const { SugarError } = require('../../helpers/errors');
const { BookedSeat } = require('../../models');
const { ErrBookedSeatNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const bookedSeat = await BookedSeat.findOne({ where: { id } });

    if (!bookedSeat) {
      throw new SugarError(ErrBookedSeatNotFound);
    }

    return bookedSeat;
  } catch (error) {
    throw new SugarError(error);
  }
};
