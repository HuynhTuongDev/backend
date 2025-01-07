const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/User.js
module.exports = () => {
    const User = sequelize.define('User', {
      userID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      fullName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: DataTypes.STRING(20),
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address: DataTypes.STRING(50),
      roleID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      failedAttempt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      logTime: DataTypes.DATE,
    }, {
      tableName: 'users',
      timestamps: false,
    });
  
    User.associate = function(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleID',
        as: 'role',
      });
    };
  
    return User;
  };
  