module.exports = (
  errors
) => `//DO NOT EDIT: code generated from 'tools/gen-err-code.go'

const { SugarError } = require('../helpers/errors');

const errNameToAppError = {
${errors
  .map(
    ([name, code, httpCode, message]) =>
      ` ${name}: { statusCode: ${httpCode}, code: ${code}, message: "${message}" }`
  )
  .join(',\n')}
 
}

module.exports = errNameToAppError;
`;
