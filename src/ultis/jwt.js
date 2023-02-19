const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJWT = ({ userId, userRoles }, expiresIn = '24h') =>
  jwt.sign(
    {
      userId,
      userRoles,
    },
    config.jwtSecretKey,
    { expiresIn }
  );

const decodeJwt = (token) => {
  const decoded = jwt.verify(token, config.jwtSecretKey);
  return decoded;
};
module.exports = {
  decodeJwt,
  generateJWT,
};
