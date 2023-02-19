
const { SugarError } = require('../../helpers/errors');
const { BookedSeat } = require('../../models');

module.exports = async ({ limit = 10, offset = 0 }) => {
	try {
		const bookedSeats = await BookedSeat.findAll({
      limit: limit + 1,
      offset,
    });

		let nextPagination = null;

    if (bookedSeats.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      bookedSeats.pop();
    }

		return { bookedSeats, nextPagination };
	} catch (error) {
		throw new SugarError(error);
	}
};
