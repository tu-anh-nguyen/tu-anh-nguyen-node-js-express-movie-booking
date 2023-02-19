const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'ShowTime',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      theaterId: {
        type: DataTypes.INTEGER,
        field: 'theater_id',
        allowNull: false,
      },
      movieId: {
        type: DataTypes.INTEGER,
        field: 'movie_id',
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
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
      tableName: 'show_times',
      timestamps: true,
    }
  );
