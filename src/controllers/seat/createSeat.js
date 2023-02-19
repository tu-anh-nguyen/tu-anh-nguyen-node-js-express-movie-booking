const resp = require('../../helpers/response');
const seatServices = require('../../services/seat');

module.exports = async (req, res, next) => {
  const { name, code, type, theaterId } = req.body;
  try {
    const seat = await seatServices.createSeat({ name, code, type, theaterId });
    resp({
      res,
      data: seat,
    });
  } catch (error) {
    next(error);
  }
};
