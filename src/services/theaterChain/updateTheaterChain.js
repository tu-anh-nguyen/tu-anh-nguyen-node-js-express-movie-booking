const { SugarError } = require('../../helpers/errors');
const { TheaterChain, TheaterBrand } = require('../../models');
const {
  ErrTheaterChainNotFound,
  ErrTheaterBrandNotFound,
} = require('../../pkg/appError');

module.exports = async (id, args) => {
  try {
    const theaterChain = await TheaterChain.findOne({
      where: {
        id: id,
      },
    });

    if (!theaterChain) {
      throw new SugarError(ErrTheaterChainNotFound);
    }

    //Check brandId if update
    if (args.brandId) {
      const theaterBrand = await TheaterBrand.findOne({
        where: { id: args.brandId },
      });

      if (!theaterBrand) {
        throw new SugarError(ErrTheaterBrandNotFound);
      }
    }

    theaterChain.set(args);
    await theaterChain.save();

    return theaterChain;
  } catch (error) {
    throw new SugarError(error);
  }
};
