const { templateModel } = require('../templates');
const fs = require('fs');

const modelDirectiory = `./src/models`;

module.exports = (componentName, modelName, tableName) => {
  const generateModelTemplates = templateModel(
    componentName,
    modelName,
    tableName
  );
  fs.writeFileSync(
    `${modelDirectiory}/${generateModelTemplates.name}`,
    generateModelTemplates.content
  );
  console.log(
    'CREATED'.green,
    `${modelDirectiory}/${generateModelTemplates.name}`.green
  );

  // Update models/index.js
  const currentCtx = fs.readFileSync(`${modelDirectiory}/index.js`).toString();

  const defineModelCtx = `\nconst ${modelName} = require('./${modelName}')(sequelize);`;
  const defineIdx = currentCtx.indexOf(`// define models`) + 16;

  const exportModelCtx = `  ${modelName},\n`;
  const exportModelIdx = currentCtx.length - 4;

  const newCtx =
    currentCtx.slice(0, defineIdx) +
    defineModelCtx +
    currentCtx.slice(defineIdx, exportModelIdx) +
    exportModelCtx +
    currentCtx.slice(exportModelIdx);

  fs.writeFileSync(`${modelDirectiory}/index.js`, newCtx);
  console.log('UPDATED'.blue, `${modelDirectiory}/index.js`.green);
};
