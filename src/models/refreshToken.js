const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

// models/RefreshToken.js
module.exports = () => {
    const RefreshToken = sequelize.define('RefreshToken', {
      tokenID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userID: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiryTime: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP + INTERVAL \'1 week\''),
      },
    }, {
      tableName: 'refreshTokens',
      timestamps: false,
    });
  
    RefreshToken.associate = function(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: 'userID',
        as: 'user',
      });
    };
  
    return RefreshToken;
  };
  