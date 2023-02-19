const { SugarError } = require('../../helpers/errors');
const { Movie } = require('../../models');
const { ErrMovieNotFound } = require('../../pkg/appError');

module.exports = async (id, args) => {
  try {
    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      throw new SugarError(ErrMovieNotFound);
    }

    movie.set(args);
    await movie.save();

    return movie;
  } catch (error) {
    throw new SugarError(error);
  }
};
