const resp = require('../../helpers/response');
const seatServices = require('../../services/seat');

module.exports = async (req, res, next) => {
  const { showTimeId } = req.params;
  try {
    const seat = await seatServices.getSeatsByShowTime(showTimeId);
    resp({
      res,
      data: seat,
    });
  } catch (error) {
    next(error);
  }
};
