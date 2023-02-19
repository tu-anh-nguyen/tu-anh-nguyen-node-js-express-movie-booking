const resp = require('../../helpers/response');
const theaterServices = require('../../services/theater');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const args = req.body;
  try {
    const theater = await theaterServices.updateTheater(id, args);
    resp({
      res,
      data: theater,
    });
  } catch (error) {
    next(error);
  }
};
