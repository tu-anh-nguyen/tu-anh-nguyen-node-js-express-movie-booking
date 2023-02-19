const { SugarError } = require('../../helpers/errors');
const { Theater, TheaterChain } = require('../../models');
const {
  ErrTheaterNotFound,
  ErrTheaterChainNotFound,
} = require('../../pkg/appError');

module.exports = async (id, args) => {
  try {
    const theater = await Theater.findOne({ where: { id } });

    if (!theater) {
      throw new SugarError(ErrTheaterNotFound);
    }

    //Check chainId if update
    if (args.chainId) {
      const theaterChain = await TheaterChain.findOne({
        where: { id: args.chainId },
      });

      if (!theaterChain) {
        throw new SugarError(ErrTheaterChainNotFound);
      }
    }

    theater.set(args);
    await theater.save();

    return theater;
  } catch (error) {
    throw new SugarError(error);
  }
};
