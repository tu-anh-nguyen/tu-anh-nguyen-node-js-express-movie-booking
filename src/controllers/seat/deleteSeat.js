const resp = require('../../helpers/response');
const seatServices = require('../../services/seat');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const seat = await seatServices.deleteSeat(id);
    resp({
      res,
      data: seat,
    });
  } catch (error) {
    next(error);
  }
};
