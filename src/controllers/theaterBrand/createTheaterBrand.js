const resp = require('../../helpers/response');
const theaterBrandServices = require('../../services/theaterBrand');

module.exports = async (req, res, next) => {
  const { code, name, thumbnail } = req.body;
  try {
    const theaterBrand = await theaterBrandServices.createTheaterBrand({
      code,
      name,
      thumbnail,
    });
    resp({
      res,
      data: theaterBrand,
    });
  } catch (error) {
    next(error);
  }
};
