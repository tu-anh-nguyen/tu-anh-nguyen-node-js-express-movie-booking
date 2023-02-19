const resp = require('../../helpers/response');
const ticketServices = require('../../services/ticket');

module.exports = async (req, res, next) => {
  const { showTimeId, seats } = req.body;
  const { userId } = req;
  try {
    const ticket = await ticketServices.createTicket({
      userId,
      showTimeId,
      seats,
    });
    resp({
      res,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
};
