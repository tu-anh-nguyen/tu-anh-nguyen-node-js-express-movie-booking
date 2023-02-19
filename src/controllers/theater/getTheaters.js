const resp = require('../../helpers/response');
const theaterServices = require('../../services/theater');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.body;
  try {
    const theater = await theaterServices.getTheaters({ limit, offset });
    resp({
      res,
      data: theater,
    });
  } catch (error) {
    next(error);
  }
};
