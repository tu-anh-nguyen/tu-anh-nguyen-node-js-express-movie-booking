const config = require('../../config');
const resp = require('../../helpers/response');
const { ErrAccountExisted } = require('../../pkg/appError');

module.exports = async (req, res, next) => {
  const file = req.file;
  console.log('=-=====');
  if (!file) {
    next(new SugarError(ErrAccountExisted));
  }

  const url = '/' + file.path;
  resp({
    res,
    data: file,
  });
};
