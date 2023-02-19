const { SugarError } = require('../../helpers/errors');
const { Theater, TheaterChain } = require('../../models');
const { ErrTheaterChainNotFound } = require('../../pkg/appError');

module.exports = async ({ chainId, code, name, thumbnail }) => {
  try {
    const theaterChain = await TheaterChain.findOne({ where: { id: chainId } });

    if (!theaterChain) {
      throw new SugarError(ErrTheaterChainNotFound);
    }

    const theater = await Theater.create({ code, name, thumbnail, chainId });
    return theater;
  } catch (error) {
    throw new SugarError(error);
  }
};
