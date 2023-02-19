const resp = require('../../helpers/response');
const showTimeServices = require('../../services/showTime');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const showTime = await showTimeServices.findShowTimeById(id);
    resp({
      res,
      data: showTime,
    });
  } catch (error) {
    next(error);
  }
};
