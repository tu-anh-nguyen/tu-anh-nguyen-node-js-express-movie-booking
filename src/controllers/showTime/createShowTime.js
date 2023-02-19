const resp = require('../../helpers/response');
const showTimeServices = require('../../services/showTime');

module.exports = async (req, res, next) => {
  const { theaterId, movieId, time, price } = req.body;
  try {
    const showTime = await showTimeServices.createShowTime({
      theaterId,
      movieId,
      time,
      price,
    });
    resp({
      res,
      data: showTime,
    });
  } catch (error) {
    next(error);
  }
};
