const { SugarError } = require('../../helpers/errors');
const { Ticket, BookedSeat } = require('../../models');
const { ErrTicketNotFound } = require('../../pkg/appError');

module.exports = async (id, isRoot, requesterId) => {
  try {
    const ticket = await Ticket.findOne({ where: { id } });

    if (!ticket) {
      throw new SugarError(ErrTicketNotFound);
    }

    if (!isRoot && requesterId !== ticket.dataValues.userId) {
      throw new SugarError(ErrPermissionDenied);
    }

    await BookedSeat.destroy({
      where: { ticketId: ticket.dataValues.id },
    });

    await ticket.destroy();
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
