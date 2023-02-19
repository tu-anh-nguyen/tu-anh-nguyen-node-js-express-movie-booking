const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'TheaterChain',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brandId: {
        type: DataTypes.INTEGER,
        field: 'brand_id',
        allowNull: false,
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
      tableName: 'theater_chains',
      timestamps: true,
    }
  );
