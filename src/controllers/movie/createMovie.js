const resp = require('../../helpers/response');
const movieServices = require('../../services/movie');

module.exports = async (req, res, next) => {
  const {
    name,
    code,
    trailer,
    description,
    images,
    openingDate,
    rating,
    hot,
    nowShowing,
    comingSoon,
  } = req.body;
  try {
    const movie = await movieServices.createMovie({
      name,
      code,
      trailer,
      description,
      images,
      openingDate,
      rating,
      hot,
      nowShowing,
      comingSoon,
    });
    resp({
      res,
      data: movie,
    });
  } catch (error) {
    next(error);
  }
};
