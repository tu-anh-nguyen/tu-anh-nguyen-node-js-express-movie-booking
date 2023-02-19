const resp = require('../../helpers/response');
const theaterServices = require('../../services/theater');

module.exports = async (req, res, next) => {
  const { chainId, code, name, thumbnail } = req.body;
  try {
    const theater = await theaterServices.createTheater({
      chainId,
      code,
      name,
      thumbnail,
    });
    resp({
      res,
      data: theater,
    });
  } catch (error) {
    next(error);
  }
};
