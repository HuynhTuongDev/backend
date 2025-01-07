const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/Brand.js
module.exports = () => {
    const Brand = sequelize.define('Brand', {
      brandID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      brandName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    }, {
      tableName: 'brands',
      timestamps: false, // Vì không có createdAt, updatedAt
    });
  
    return Brand;
  };
  