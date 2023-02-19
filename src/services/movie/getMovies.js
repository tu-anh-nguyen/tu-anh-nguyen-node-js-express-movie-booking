const { SugarError } = require('../../helpers/errors');
const { Movie } = require('../../models');
const removeEmpty = require('../../ultis/removeEmpty');

module.exports = async ({ filter = {}, limit = 10, offset = 0 }) => {
  const { from, to, nowShowing, comingSoon } = filter;

  const where = removeEmpty({ nowShowing, comingSoon });

  if (from && to) {
    where.openingDate = {
      $between: [from, to],
    };
  }

  try {
    const movies = await Movie.findAll({
      limit: limit + 1,
      offset,
      where,
    });

    let nextPagination = null;

    if (movies.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      movies.pop();
    }

    return { movies, nextPagination };
  } catch (error) {
    throw new SugarError(error);
  }
};
