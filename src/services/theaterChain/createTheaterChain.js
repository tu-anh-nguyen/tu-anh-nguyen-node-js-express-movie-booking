const { SugarError } = require('../../helpers/errors');
const { TheaterChain, TheaterBrand } = require('../../models');
const { ErrTheaterBrandNotFound } = require('../../pkg/appError');

module.exports = async ({ brandId, code, name, thumbnail, address }) => {
  try {
    const theaterBrand = await TheaterBrand.findOne({ where: { id: brandId } });

    if (!theaterBrand) {
      throw new SugarError(ErrTheaterBrandNotFound);
    }

    const theaterChain = await TheaterChain.create({
      brandId,
      code,
      name,
      thumbnail,
      address,
    });
    return theaterChain;
  } catch (error) {
    throw new SugarError(error);
  }
};
