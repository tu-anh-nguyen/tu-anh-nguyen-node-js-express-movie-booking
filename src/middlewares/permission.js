const { SugarError } = require('../helpers/errors');
const { ErrPermissionDenied } = require('../pkg/appError');
const UserRole = require('../enums/UserRole');

module.exports = (role) => async (req, _res, next) => {
  try {
    const roles = req.userRoles;
    if (!req.isRoot && (!roles || !roles?.includes(role))) {
      throw new SugarError(ErrPermissionDenied);
    }
    next();
  } catch (error) {
    next(error);
  }
};
