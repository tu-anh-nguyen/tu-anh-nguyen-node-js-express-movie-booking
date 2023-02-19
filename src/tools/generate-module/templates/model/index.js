module.exports = (_componentName, modelName, tableName) => {
  return {
    content: `
const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    '${modelName}',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      tableName: '${tableName}s',
      timestamps: true,
    }
  );    
`,
    name: `${modelName}.js`,
  };
};
