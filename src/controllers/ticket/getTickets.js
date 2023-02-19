const resp = require('../../helpers/response');
const ticketServices = require('../../services/ticket');

module.exports = async (req, res, next) => {
  const { filter, limit, offset } = req.body;
  const { userId: requesterId, isRoot } = req;
  try {
    const ticket = await ticketServices.getTickets({
      filter,
      isRoot,
      requesterId,
      limit,
      offset,
    });
    resp({
      res,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
