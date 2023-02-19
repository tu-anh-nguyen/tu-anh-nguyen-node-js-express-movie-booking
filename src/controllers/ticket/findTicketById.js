const resp = require('../../helpers/response');
const ticketServices = require('../../services/ticket');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { isRoot, userId: requesterId } = req;

  try {
    const ticket = await ticketServices.findTicketById(id, isRoot, requesterId);
    resp({
      res,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
