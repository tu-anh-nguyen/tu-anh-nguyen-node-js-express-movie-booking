const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  username: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || '123456',
  dbPort: process.env.DB_PORT || 3307,
  dbHost: process.env.DB_HOST || 'localhost',
  dbname: process.env.DB_NAME || 'db',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'jwtSecretKey',
  port: +process.env.PORT || 4000,
  domain: process.env.DOMAIN || `localhost:${+process.env.PORT || 4000}`,
};
