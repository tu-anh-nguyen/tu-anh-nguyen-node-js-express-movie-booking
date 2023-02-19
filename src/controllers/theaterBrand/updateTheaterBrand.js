const resp = require('../../helpers/response');
const theaterBrandServices = require('../../services/theaterBrand');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const args = req.body;
  try {
    const theaterBrand = await theaterBrandServices.updateTheaterBrand(
      id,
      args
    );
    resp({
      res,
      data: theaterBrand,
    });
  } catch (error) {
    next(error);
  }
};
