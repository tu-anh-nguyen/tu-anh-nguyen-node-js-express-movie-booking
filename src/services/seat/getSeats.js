const { SugarError } = require('../../helpers/errors');
const { Seat } = require('../../models');
const removeEmpty = require('../../ultis/removeEmpty');

module.exports = async ({ filter, limit: _limit, offset = 0 }) => {
  const { theaterId, type } = filter || {};

  const where = removeEmpty({ theaterId, type });
  let limit;
  if (_limit && _limit !== -1) {
    limit = _limit + 1;
  }
  try {
    const seats = await Seat.findAll({
      limit,
      offset,
      where,
    });
    const total = await Seat.count({ where });
    let nextPagination = null;

    if (seats.length > limit - 1) {
      nextPagination = {
        limit: limit - 1,
        offset: offset + limit,
      };
      seats.pop();
    }

    return { total, seats, nextPagination };
  } catch (error) {
    throw new SugarError(error);
  }
};
