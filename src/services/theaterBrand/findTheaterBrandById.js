const { SugarError } = require('../../helpers/errors');
const { TheaterBrand } = require('../../models');
const { ErrTheaterBrandNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const theaterBrand = await TheaterBrand.findOne({ where: { id } });

    if (!theaterBrand) {
      throw new SugarError(ErrTheaterBrandNotFound);
    }

    return theaterBrand;
  } catch (error) {
    throw new SugarError(error);
  }
};
