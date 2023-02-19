const { SugarError } = require('../../helpers/errors');
const { TheaterChain } = require('../../models');

module.exports = async ({ limit = 10, offset = 0 }) => {
  try {
    const theaterChains = await TheaterChain.findAll({
      limit: limit + 1,
      offset,
      include: {
        association: 'theaters',
        attributes: {
          exclude: ['chainId'],
        },
      },
    });

    let nextPagination = null;

    if (theaterChains.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      theaterChains.pop();
    }

    return { theaterChains, nextPagination };
  } catch (error) {
    throw new SugarError(error);
  }
};
