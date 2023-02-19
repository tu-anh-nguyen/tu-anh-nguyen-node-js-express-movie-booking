const { templateControllers } = require('../templates');
const fs = require('fs');
require('colors');

module.exports = (componentName, modelName, tableName) => {
  const controllersDirectory = `./src/controllers/${componentName}`;

  fs.mkdirSync(controllersDirectory);
  templateControllers.forEach((template) => {
    const temp = template(componentName, modelName, tableName);
    fs.writeFileSync(`${controllersDirectory}/${temp.name}`, temp.content);
    console.log('CREATED'.green, `${controllersDirectory}/${temp.name}`.green);
  });
};
