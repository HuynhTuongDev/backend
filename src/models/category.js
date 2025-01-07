const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/Category.js
module.exports = () => {
    const Category = sequelize.define('Category', {
      categoryID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      createTime: DataTypes.DATE,
      updateTime: DataTypes.DATE,
    }, {
      tableName: 'categories',
      timestamps: false,
    });
  
    return Category;
  };
  