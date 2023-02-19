const { SugarError } = require('../../helpers/errors');
const { TheaterBrand } = require('../../models');
const { ErrTheaterBrandNotFound } = require('../../pkg/appError');

module.exports = async (id, args) => {
  try {
    const theaterBrand = await TheaterBrand.findOne({
      where: {
        id: id,
      },
    });

    if (!theaterBrand) {
      throw new SugarError(ErrTheaterBrandNotFound);
    }

    theaterBrand.set(args);
    await theaterBrand.save();

    return theaterBrand;
  } catch (error) {
    throw new SugarError(error);
  }
};
