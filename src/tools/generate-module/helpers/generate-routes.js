const { templateRoutes } = require('../templates');
const fs = require('fs');
require('colors');

module.exports = (componentName, modelName, tableName) => {
  const routesDirectory = `./src/routes/v1`;
  const routeName = tableName.replace('_', '-');

  const generatedTemplate = templateRoutes(componentName, modelName, tableName);

  fs.writeFileSync(
    `${routesDirectory}/${generatedTemplate.name}`,
    generatedTemplate.content
  );
  console.log(
    'CREATED'.green,
    `${routesDirectory}/${generatedTemplate.name}`.green
  );

  const currentCtx = fs.readFileSync(`${routesDirectory}/index.js`).toString();

  const importCtx = `\nconst ${componentName}Router = require('./${componentName}');`;
  const importIdx = currentCtx.indexOf(`// import routes`) + 16;

  const defineCtx = `\nrouter.use('/${routeName}s', ${componentName}Router);`;
  const defineIdx = currentCtx.indexOf(`// define routes`) + 16;

  const newCtx =
    currentCtx.slice(0, importIdx) +
    importCtx +
    currentCtx.slice(importIdx, defineIdx) +
    defineCtx +
    currentCtx.slice(defineIdx);

  fs.writeFileSync(`${routesDirectory}/index.js`, newCtx);
  console.log('UPDATED'.blue, `${routesDirectory}/index.js`.green);
};
