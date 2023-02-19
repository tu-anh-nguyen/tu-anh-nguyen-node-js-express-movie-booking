const resp = require('../../helpers/response');
const movieServices = require('../../services/movie');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const args = req.body;
  try {
    const movie = await movieServices.updateMovie(id, args);
    resp({
      res,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};
