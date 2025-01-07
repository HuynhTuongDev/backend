const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/CartItem.js
module.exports = () => {
    const CartItem = sequelize.define('CartItem', {
      cartItemID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      cartID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      productID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'cartItems',
      timestamps: false,
    });
  
    CartItem.associate = function(models) {
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cartID',
        as: 'cart',
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: 'productID',
        as: 'product',
      });
    };
  
    return CartItem;
  };
  