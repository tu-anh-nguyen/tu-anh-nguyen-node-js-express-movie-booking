const resp = require('../../helpers/response');
const bookedSeatServices = require('../../services/bookedSeat');

module.exports = async (req, res, next) => {
  const args = req.body;
  try {
    const bookedSeat = await bookedSeatServices.createBookedSeat(args);
    resp({
      res,
      data: bookedSeat,
    });
  } catch (error) {
    next(error);
  }
};
