const { SugarError } = require('../../helpers/errors');
const { ShowTime } = require('../../models');
const { ErrShowTimeNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const showTime = await ShowTime.findOne({ where: { id } });

    if (!showTime) {
      throw new SugarError(ErrShowTimeNotFound);
    }

    return showTime;
  } catch (error) {
    throw new SugarError(error);
  }
};
