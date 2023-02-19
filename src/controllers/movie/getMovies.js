const resp = require('../../helpers/response');
const movieServices = require('../../services/movie');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.body;
  try {
    const movie = await movieServices.getMovies({ limit, offset });
    resp({
      res,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};
