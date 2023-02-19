const { SugarError } = require('../../helpers/errors');
const { BookedSeat } = require('../../models');

module.exports = async (args) => {
  try {
    const bookedSeat = await BookedSeat.create(args);
    return bookedSeat;
  } catch (error) {
    throw new SugarError(error);
  }
};
