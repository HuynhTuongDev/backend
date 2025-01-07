const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/Cart.js
module.exports = () => {
    const Cart = sequelize.define('Cart', {
      cartID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    }, {
      tableName: 'carts',
      timestamps: false,
    });
  
    Cart.associate = function(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'user',
      });
    };
  
    return Cart;
  };
  