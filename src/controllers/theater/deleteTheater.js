const resp = require('../../helpers/response');
const theaterServices = require('../../services/theater');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  try {
    const theater = await theaterServices.deleteTheater(id);
    resp({
      res,
      data: theater,
    });
  } catch (error) {
    next(error);
  }
};
