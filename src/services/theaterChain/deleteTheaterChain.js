const { SugarError } = require('../../helpers/errors');
const { TheaterChain } = require('../../models');
const { ErrTheaterChainNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const theaterChain = await TheaterChain.findOne({ where: { id } });

    if (!theaterChain) {
      throw new SugarError(ErrTheaterChainNotFound);
    }

    await TheaterChain.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
