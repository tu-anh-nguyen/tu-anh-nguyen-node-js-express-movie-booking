const { Sequelize } = require('sequelize');
const { SugarError } = require('../../helpers/errors');
const { ShowTime, Theater } = require('../../models');
const removeEmpty = require('../../ultis/removeEmpty');

module.exports = async ({ filter, limit = 10, offset = 0 }) => {
  const { chainId, theaterId } = filter || {};
  try {
    const where = removeEmpty({ theaterId });
    // get record filter with chainId and without theaterId, need to find all theater_id
    if (chainId && !theaterId) {
      const theaters = await Theater.findAll({
        where: {
          chainId,
        },
      });
      const theaterIds = theaters.map(({ id }) => id);
      where.theaterId = {
        [Sequelize.Op.in]: theaterIds,
      };
    }

    const showTimes = await ShowTime.findAll({
      limit: limit + 1,
      offset,
      where,
      attributes: {
        exclude: ['theaterId', 'movieId', 'createdAt', 'updatedAt'],
      },
      include: [
        {
          association: 'theater',
          // include: {
          //   association: 'chain',
          // },
          // attributes: {
          //   exclude: ['createdAt', 'updatedAt'],
          // },
        },
        {
          association: 'movie',
          attributes: {
            exclude: ['description', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });

    let nextPagination = null;

    if (showTimes.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      showTimes.pop();
    }

    return { showTimes, nextPagination };
  } catch (error) {
    throw new SugarError(error);
  }
};
