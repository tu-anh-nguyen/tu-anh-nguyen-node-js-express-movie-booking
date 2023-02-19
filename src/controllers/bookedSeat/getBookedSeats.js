const resp = require('../../helpers/response');
const bookedSeatServices = require('../../services/bookedSeat');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.body;
  try {
    const bookedSeat = await bookedSeatServices.getBookedSeats({ limit, offset });
    resp({
      res,
      data: bookedSeat,
    });
  } catch (error) {
    next(error);
  }
};
