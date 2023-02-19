const R = require('ramda');

module.exports = (key, list) => R.groupBy(R.prop(key), list);
