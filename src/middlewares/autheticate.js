const jwt = require('jsonwebtoken');
const config = require('../config');
const { SugarError } = require('../helpers/errors');
const { ErrUnauthenticated } = require('../pkg/appError');
const { User } = require('../models');
const { decodeJwt } = require('../ultis/jwt');
const UserRole = require('../enums/UserRole');

module.exports = async (req, _res, next) => {
  try {
    const bearerToken = req.headers.authorization || '';
    const token = bearerToken.replace('Bearer ', '');
    if (!token) {
      throw new SugarError(ErrUnauthenticated);
    }

    const decoded = decodeJwt(token);
    const user = await User.findOne({ where: { id: decoded.userId } });
    if (!user) {
      throw new SugarError(ErrUnauthenticated);
    }

    req.userId = decoded.userId;
    req.userRoles = decoded.userRoles;

    if (decoded.userRoles?.includes(UserRole.ADMIN)) {
      req.isRoot = true;
    }
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      error.code = ErrUnauthenticated.code;
      error.statusCode = ErrUnauthenticated.statusCode;
      next(new SugarError(error));
    }
    next(error);
  }
};
