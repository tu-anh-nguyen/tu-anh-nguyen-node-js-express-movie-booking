const resp = require('../../helpers/response');
const theaterChainServices = require('../../services/theaterChain');

module.exports = async (req, res, next) => {
  const { brandId, code, name, thumbnail, address } = req.body;
  try {
    const theaterChain = await theaterChainServices.createTheaterChain({
      brandId,
      code,
      name,
      thumbnail,
      address,
    });
    resp({
      res,
      data: theaterChain,
    });
  } catch (error) {
    next(error);
  }
};
