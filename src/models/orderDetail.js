const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/OrderDetail.js
module.exports = () => {
    const OrderDetail = sequelize.define('OrderDetail', {
      orderDetailID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      orderID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      productID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(18, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      tableName: 'orderDetails',
      timestamps: false,
    });
  
    OrderDetail.associate = function(models) {
      OrderDetail.belongsTo(models.Order, {
        foreignKey: 'orderID',
        as: 'order',
      });
      OrderDetail.belongsTo(models.Product, {
        foreignKey: 'productID',
        as: 'product',
      });
    };
  
    return OrderDetail;
  };
  