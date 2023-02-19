const { SugarError } = require('../../helpers/errors');
const { TheaterBrand } = require('../../models');

module.exports = async ({ limit = 10, offset = 0 }) => {
  try {
    const theaterBrands = await TheaterBrand.findAll({
      limit: limit + 1,
      offset,
    });

    let nextPagination = null;

    if (theaterBrands.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      theaterBrands.pop();
    }

    return { theaterBrands, nextPagination };
  } catch (error) {
    throw new SugarError(error);
  }
};
