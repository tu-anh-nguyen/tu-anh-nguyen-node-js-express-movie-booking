const { Sequelize } = require('sequelize');
const { SugarError } = require('../../helpers/errors');
const { Ticket, Seat, BookedSeat } = require('../../models');
const { ErrTicketNotFound } = require('../../pkg/appError');

module.exports = async (id, isRoot, requesterId) => {
  try {
    const where = { id };

    if (!isRoot) {
      where.userId = requesterId;
    }
    // include: [
    //   // [Sequelize.fn('count', Sequelize.col('bookedSeats.ticket_id')), 'totalSeat'],
    //   [
    //     Sequelize.literal(
    //       '(SELECT COUNT(*) FROM booked_seats AS booked_seat where booked_seat.ticket_id = Ticket.id)'
    //     ),
    //     'totalSeat',
    //   ],
    //   [
    //     Sequelize.literal(
    //       '(SELECT SUM(booked_seat.price) FROM booked_seats AS booked_seat  WHERE booked_seat.ticket_id = Ticket.id)'
    //     ),
    //     'totalPrice',
    //   ],
    // ],
    // const ticket = await Ticket.findOne({
    //   where,
    //   attributes: {

    //   },
    //   include: {
    //     association: 'bookedSeats',
    //     attributes: {
    //       include: [[Sequelize.col('bookedSeats.seats.price'), 'price']],
    //     },
    //     through: {
    //       as: 'seats',
    //       attributes: ['price'],
    //     },
    //   },
    // });

    const ticket = await Ticket.findOne({
      where,
      attributes: [
        'id',
        // [
        //   Sequelize.fn(
        //     'count',
        //     Sequelize.fn(
        //       'DISTINCT',
        //       Sequelize.col('bookedSeats.bookDetails.ticket_id')
        //     )
        //   ),
        //   'totalSeat',
        // ],
        // [
        //   Sequelize.fn('sum', Sequelize.col('bookedSeats.bookDetails.price')),
        //   'totalPrice',
        // ],
      ],
      include: {
        association: 'bookedSeats',
        through: {
          as: 'bookDetails',
          attributes: ['ticketId', 'price'],
        },
      },
      group: ['bookedSeats.id'],
    });

    if (!ticket) {
      throw new SugarError(ErrTicketNotFound);
    }

    // const bookedSeats = await Seat.findAll({
    //   include: {
    //     association: 'tickets',
    //     where: { id: ticket.dataValues.id },
    //     through: {
    //       model: BookedSeat,
    //       attributes: ['price'],
    //     },
    //   },
    //   attributes: {
    //     include: [[Sequelize.col('tickets.BookedSeat.price'), 'price']], //
    //   },
    //   group: ['Seat.id'], // nhóm kết quả theo trường "id" của bảng Seat
    // });

    return {
      ticket,
      // bookedSeats,
    };
  } catch (error) {
    throw new SugarError(error);
  }
};
