const resp = require('../../helpers/response');
const theaterBrandServices = require('../../services/theaterBrand');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.body;
  try {
    const theaterBrand = await theaterBrandServices.getTheaterBrands({
      limit,
      offset,
    });
    resp({
      res,
      data: theaterBrand,
    });
  } catch (error) {
    next(error);
  }
};
