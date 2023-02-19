const { templateServices } = require('../templates');
const fs = require('fs');
require('colors');

module.exports = (componentName, modelName) => {
  const servicesDirectory = `./src/services/${componentName}`;

  fs.mkdirSync(servicesDirectory);
  templateServices.forEach((template) => {
    const temp = template(componentName, modelName);
    fs.writeFileSync(`${servicesDirectory}/${temp.name}`, temp.content);
    console.log('CREATED'.green, `${servicesDirectory}/${temp.name}`.green);
  });
};
