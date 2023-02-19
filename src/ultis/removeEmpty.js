const R = require('ramda');

module.exports = (args) => R.reject(R.isNil, args);
