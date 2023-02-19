const resp = require('../../helpers/response');
const showTimeServices = require('../../services/showTime');

module.exports = async (req, res, next) => {
  const { filter, limit, offset } = req.body;
  try {
    const showTime = await showTimeServices.getShowTimes({
      filter,
      limit,
      offset,
    });
    resp({
      res,
      data: showTime,
    });
  } catch (error) {
    next(error);
  }
};
