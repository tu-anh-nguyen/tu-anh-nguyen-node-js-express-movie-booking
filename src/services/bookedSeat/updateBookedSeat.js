const { SugarError } = require('../../helpers/errors');
const { BookedSeat } = require('../../models');
const { ErrBookedSeatNotFound } = require('../../pkg/appError');

module.exports = async (id, args) => {
	try {
		const bookedSeat = await BookedSeat.findOne({ where: { id } });

    if (!bookedSeat) {
      throw new SugarError(ErrBookedSeatNotFound);
    }

    bookedSeat.set(args);
    await bookedSeat.save();

		return bookedSeat;
	} catch (error) {
		throw new SugarError(error);
	}
};
