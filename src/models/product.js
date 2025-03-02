const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/Product.js
module.exports = () => {
  const Product = sequelize.define('Product', {
    productID: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
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
    categoryID: {
      type: DataTypes.BIGINT,
    },
    brandID: {
      type: DataTypes.BIGINT,
    },
    imageURL: DataTypes.STRING(255),
    discount: { // Cột discount mới
      type: DataTypes.DECIMAL(5, 2), // Kiểu dữ liệu DECIMAL, ví dụ 0.10 cho 10% giảm giá
      allowNull: true, // Cột này có thể để null nếu sản phẩm không có giảm giá
    },
  }, {
    tableName: 'products',
    timestamps: false,
  });

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryID',
      as: 'category',
    });
    Product.belongsTo(models.Brand, {
      foreignKey: 'brandID',
      as: 'brand',
    });
  };

  return Product;
};
