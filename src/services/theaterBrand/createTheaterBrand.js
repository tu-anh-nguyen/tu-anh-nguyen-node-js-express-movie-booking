const { SugarError } = require('../../helpers/errors');
const { TheaterBrand } = require('../../models');

module.exports = async ({ code, name, thumbnail }) => {
  try {
    const theaterBrand = await TheaterBrand.create({ code, name, thumbnail });
    return theaterBrand;
  } catch (error) {
    throw new SugarError(error);
  }
};
