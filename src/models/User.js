const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const UserRoleEnum = require('../enums/UserRole');

module.exports = (sequelize) =>
  sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        field: 'full_name',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hashedPassword = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hashedPassword);
        },
      },
      role: {
        type: DataTypes.ENUM(Object.values(UserRoleEnum)),
        defaultValue: UserRoleEnum.USER,
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
      tableName: 'users',
      timestamps: true,
      defaultScope: {
        attributes: {
          exclude: 'password',
        },
      },
      hooks: {
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
