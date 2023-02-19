const resp = require('../../helpers/response');
const bookedSeatServices = require('../../services/bookedSeat');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const bookedSeat = await bookedSeatServices.deleteBookedSeat(id);
    resp({
      res,
      data: bookedSeat,
    });
  } catch (error) {
    next(error);
  }
};
