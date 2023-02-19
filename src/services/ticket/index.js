const ticketServices = {
  createTicket: require('./createTicket'),
  getTickets: require('./getTickets'),
  findTicketById: require('./findTicketById'),
  updateTicket: require('./updateTicket'),
  deleteTicket: require('./deleteTicket'),
};

module.exports = ticketServices;
