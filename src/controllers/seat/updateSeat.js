const resp = require('../../helpers/response');
const seatServices = require('../../services/seat');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const args = req.body;
  try {
    const seat = await seatServices.updateSeat(id, args);
    resp({
      res,
      data: seat,
    });
  } catch (error) {
    next(error);
  }
};
