const resp = require('../../helpers/response');
const showTimeServices = require('../../services/showTime');

module.exports = async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const showTime = await showTimeServices.findShowTimeByMovieId(movieId);
    resp({
      res,
      data: showTime,
    });
  } catch (error) {
    next(error);
  }
};
