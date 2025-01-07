const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/Role.js
module.exports = () => {
    const Role = sequelize.define('Role', {
      roleID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      roleName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    }, {
      tableName: 'roles',
      timestamps: false,
    });
  
    return Role;
  };
  