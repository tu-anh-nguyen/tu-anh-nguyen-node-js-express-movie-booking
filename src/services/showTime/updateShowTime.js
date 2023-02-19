const { SugarError } = require('../../helpers/errors');
const { ShowTime, Theater, Movie } = require('../../models');
const {
  ErrShowTimeNotFound,
  ErrTheaterNotFound,
  ErrMovieNotFound,
  ErrShowTimeDuplicated,
} = require('../../pkg/appError');

module.exports = async (id, args) => {
  try {
    const showTime = await ShowTime.findOne({ where: { id } });

    if (!showTime) {
      throw new SugarError(ErrShowTimeNotFound);
    }

    if (args.theaterId) {
      const theater = await Theater.findOne({ where: { id: args.theaterId } });
      if (!theater) {
        throw new SugarError(ErrTheaterNotFound);
      }
    }

    if (args.movieId) {
      const movie = await Movie.findOne({ where: { id: args.movieId } });
      if (!movie) {
        throw new SugarError(ErrMovieNotFound);
      }
    }

    const sameTimeShowTime = await ShowTime.findOne({
      where: {
        movieId: args.movieId || showTime.dataValues.movieId,
        theaterId: args.theaterId || showTime.dataValues.theaterId,
        time: args.time || showTime.dataValues.time,
      },
    });
    if (sameTimeShowTime) {
      throw new SugarError(ErrShowTimeDuplicated);
    }

    showTime.set(args);
    await showTime.save();

    return showTime;
  } catch (error) {
    throw new SugarError(error);
  }
};
