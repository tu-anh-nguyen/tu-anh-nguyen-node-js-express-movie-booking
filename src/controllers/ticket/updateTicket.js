const resp = require('../../helpers/response');
const ticketServices = require('../../services/ticket');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { isRoot, userId: requesterId } = req;
  const args = req.body;
  try {
    const ticket = await ticketServices.updateTicket(
      id,
      isRoot,
      requesterId,
      args
    );
    resp({
      res,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
