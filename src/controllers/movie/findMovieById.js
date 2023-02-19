const resp = require('../../helpers/response');
const movieServices = require('../../services/movie');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movie = await movieServices.findMovieById(id);
    resp({
      res,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};
