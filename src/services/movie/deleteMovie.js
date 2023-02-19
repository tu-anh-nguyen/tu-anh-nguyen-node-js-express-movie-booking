const { SugarError } = require('../../helpers/errors');
const { Movie } = require('../../models');
const { ErrMovieNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      throw new SugarError(ErrMovieNotFound);
    }
  
    await Movie.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
