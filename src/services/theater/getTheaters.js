
const { SugarError } = require('../../helpers/errors');
const { Theater } = require('../../models');

module.exports = async ({ limit = 10, offset = 0 }) => {
	try {
		const theaters = await Theater.findAll({
      limit: limit + 1,
      offset,
    });

		let nextPagination = null;

    if (theaters.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      theaters.pop();
    }

		return { theaters, nextPagination };
	} catch (error) {
		throw new SugarError(error);
	}
};
