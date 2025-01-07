const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/Order.js
module.exports = () => {
    const Order = sequelize.define('Order', {
      orderID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      tableName: 'orders',
      timestamps: false,
    });
  
    Order.associate = function(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'user',
      });
    };
  
    return Order;
  };
  