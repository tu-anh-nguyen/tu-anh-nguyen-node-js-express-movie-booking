const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>
  sequelize.define(
    'BookedSeat',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      seatId: {
        field: 'seat_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ticketId: {
        field: 'ticket_id',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
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
      tableName: 'booked_seats',
      timestamps: true,
      defaultScope: {
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    }
  );
