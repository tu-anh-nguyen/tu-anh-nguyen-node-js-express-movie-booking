const { DataTypes } = require('sequelize');
const SeatType = require('../enums/SeatType');

module.exports = (sequelize) =>
  sequelize.define(
    'Seat',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM(Object.values(SeatType)),
        defaultValue: SeatType.NORMAL,
        allowNull: false,
      },
      theaterId: {
        type: DataTypes.INTEGER,
        field: 'theater_id',
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
      tableName: 'seats',
      timestamps: true,
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );
