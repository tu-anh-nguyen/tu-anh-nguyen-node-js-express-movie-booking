const { SugarError } = require('../../helpers/errors');
const { Movie } = require('../../models');

module.exports = async ({
  name,
  code,
  trailer,
  description,
  images,
  openingDate,
  rating,
  hot,
  nowShowing,
  comingSoon,
}) => {
  try {
    const movie = await Movie.create({
      name,
      code,
      trailer,
      description,
      images,
      openingDate,
      rating,
      hot,
      nowShowing,
      comingSoon,
    });
    return movie;
  } catch (error) {
    throw new SugarError(error);
  }
};
