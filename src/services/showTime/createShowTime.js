const { SugarError } = require('../../helpers/errors');
const { ShowTime, Theater, Movie } = require('../../models');
const {
  ErrTheaterNotFound,
  ErrMovieNotFound,
  ErrShowTimeDuplicated,
} = require('../../pkg/appError');

module.exports = async ({ theaterId, movieId, time, price }) => {
  try {
    const theater = await Theater.findOne({ where: { id: theaterId } });
    if (!theater) {
      throw new SugarError(ErrTheaterNotFound);
    }

    const movie = await Movie.findOne({ where: { id: movieId } });
    if (!movie) {
      throw new SugarError(ErrMovieNotFound);
    }

    const existedShowTime = await ShowTime.findOne({
      where: {
        theaterId,
        movieId,
        time,
      },
    });
    if (existedShowTime) {
      throw new SugarError(ErrShowTimeDuplicated);
    }
    const showTime = await ShowTime.create({ theaterId, movieId, time, price });
    return showTime;
  } catch (error) {
    throw new SugarError(error);
  }
};
