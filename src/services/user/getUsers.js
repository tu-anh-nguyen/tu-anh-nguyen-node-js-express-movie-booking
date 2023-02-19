
const { SugarError } = require('../../helpers/errors');
const { User } = require('../../models');

module.exports = async ({ limit = 10, offset = 0 }) => {
	try {
		const users = await User.findAll({
      limit: limit + 1,
      offset,
    });

		let nextPagination = null;

    if (users.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      users.pop();
    }

		return { users, nextPagination };
	} catch (error) {
		throw new SugarError(error);
	}
};
