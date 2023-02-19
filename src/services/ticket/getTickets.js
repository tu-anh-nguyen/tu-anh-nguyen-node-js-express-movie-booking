const { Sequelize } = require('sequelize');
const { SugarError } = require('../../helpers/errors');
const { Ticket, BookedSeat } = require('../../models');
const removeEmpty = require('../../ultis/removeEmpty');

module.exports = async ({
  filter,
  isRoot,
  requesterId,
  limit = 10,
  offset = 0,
}) => {
  const { userId, showTimeId } = filter || {};
  try {
    const where = removeEmpty({
      userId: isRoot ? userId : requesterId,
      showTimeId,
    });
    const tickets = await Ticket.findAll({
      limit: limit + 1,
      offset,
      where,
      attributes: {
        include: [
          [
            Sequelize.literal(
              '(SELECT COUNT(*) FROM booked_seats AS booked_seat where booked_seat.ticket_id = Ticket.id)'
            ),
            'totalSeat',
          ],
          [
            Sequelize.literal(
              '(SELECT SUM(booked_seat.price) FROM booked_seats AS booked_seat  WHERE booked_seat.ticket_id = Ticket.id)'
            ),
            'totalPrice',
          ],
        ],
      },
    });

    let nextPagination = null;

    if (tickets.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      tickets.pop();
    }

    return { tickets, nextPagination };
  } catch (error) {
    throw new SugarError(error);
  }
};
