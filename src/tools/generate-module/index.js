require('colors');
const {
  generateControllers,
  generateModel,
  generateServices,
  generateRoutes,
} = require('./helpers');

const params = process.argv.slice(2);
params.forEach((param) => {
  if (!param) {
    console.error('Please supply a valid component name'.red);
    process.exit(1);
  }

  const tableName = param;
  const modelName = tableName
    .split('_')
    .map((name) => name[0].toUpperCase() + name.slice(1))
    .join('');
  const componentName = tableName[0] + modelName.slice(1);

  console.log(`Creating Component Templates with name: ${componentName}`);

  generateControllers(componentName, modelName, tableName);
  generateModel(componentName, modelName, tableName);
  generateServices(componentName, modelName, tableName);
  generateRoutes(componentName, modelName, tableName);
});
