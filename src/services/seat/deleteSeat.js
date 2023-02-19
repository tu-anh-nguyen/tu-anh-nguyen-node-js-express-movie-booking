const { SugarError } = require('../../helpers/errors');
const { Seat } = require('../../models');
const { ErrSeatNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const seat = await Seat.findOne({ where: { id } });

    if (!seat) {
      throw new SugarError(ErrSeatNotFound);
    }
  
    await Seat.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
