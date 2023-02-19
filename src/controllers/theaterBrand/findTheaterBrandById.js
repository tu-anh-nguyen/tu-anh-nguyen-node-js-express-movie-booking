const resp = require('../../helpers/response');
const theaterBrandServices = require('../../services/theaterBrand');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const theaterBrand = await theaterBrandServices.findTheaterBrandById(id);
    resp({
      res,
      data: theaterBrand,
    });
  } catch (error) {
    next(error);
  }
};
