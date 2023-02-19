const { SugarError } = require('../../helpers/errors');
const { TheaterBrand } = require('../../models');
const { ErrTheaterBrandNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const theaterBrand = await TheaterBrand.findOne({ where: { id } });

    if (!theaterBrand) {
      throw new SugarError(ErrTheaterBrandNotFound);
    }

    await TheaterBrand.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
