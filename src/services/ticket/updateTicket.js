const { SugarError } = require('../../helpers/errors');
const { Ticket } = require('../../models');
const {
  ErrTicketNotFound,
  ErrPermissionDenied,
} = require('../../pkg/appError');

module.exports = async (id, isRoot, requesterId, args) => {
  try {
    const ticket = await Ticket.findOne({ where: { id } });

    if (!isRoot && requesterId !== ticket.dataValues.userId) {
      throw new SugarError(ErrPermissionDenied);
    }

    if (!ticket) {
      throw new SugarError(ErrTicketNotFound);
    }

    ticket.set(args);
    await ticket.save();

    return ticket;
  } catch (error) {
    throw new SugarError(error);
  }
};
