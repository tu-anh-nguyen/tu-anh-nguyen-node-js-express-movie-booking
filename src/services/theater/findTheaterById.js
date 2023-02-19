const { SugarError } = require('../../helpers/errors');
const { Theater } = require('../../models');
const { ErrTheaterNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const theater = await Theater.findOne({ where: { id } });

    if (!theater) {
      throw new SugarError(ErrTheaterNotFound);
    }

    return theater;
  } catch (error) {
    throw new SugarError(error);
  }
};
