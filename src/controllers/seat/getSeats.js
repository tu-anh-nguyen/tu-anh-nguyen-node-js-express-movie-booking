const resp = require('../../helpers/response');
const seatServices = require('../../services/seat');

module.exports = async (req, res, next) => {
  const { filter, limit, offset } = req.body;
  try {
    const seat = await seatServices.getSeats({ filter, limit, offset });
    resp({
      res,
      data: seat,
    });
  } catch (error) {
    next(error);
  }
};
