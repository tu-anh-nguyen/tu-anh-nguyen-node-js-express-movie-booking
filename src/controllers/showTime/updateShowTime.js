const resp = require('../../helpers/response');
const showTimeServices = require('../../services/showTime');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const args = req.body;
  try {
    const showTime = await showTimeServices.updateShowTime(id, args);
    resp({
      res,
      data: showTime,
    });
  } catch (error) {
    next(error);
  }
};
