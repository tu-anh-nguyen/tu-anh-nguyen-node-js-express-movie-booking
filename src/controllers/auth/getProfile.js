const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  const { userId } = req;
  try {
    const user = await userServices.findUserById(userId);
    resp({
      res,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
