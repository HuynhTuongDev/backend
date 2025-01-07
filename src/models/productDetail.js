const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/ProductDetail.js
module.exports = () => {
    const ProductDetail = sequelize.define('ProductDetail', {
      productDetailID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      productID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      specifications: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      warrantyPeriod: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    }, {
      tableName: 'productDetails',
      timestamps: false,
    });
  
    ProductDetail.associate = function(models) {
      ProductDetail.belongsTo(models.Product, {
        foreignKey: 'productID',
        as: 'product',
      });
    };
  
    return ProductDetail;
  };
  