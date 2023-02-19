const { SugarError } = require('../../helpers/errors');
const { ShowTime } = require('../../models');
const { ErrShowTimeNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const showTime = await ShowTime.findOne({ where: { id } });

    if (!showTime) {
      throw new SugarError(ErrShowTimeNotFound);
    }
  
    await ShowTime.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
