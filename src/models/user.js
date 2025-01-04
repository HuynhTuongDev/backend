const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Đảm bảo đây là sequelize từ Sequelize class

const User = sequelize.define('User', {
    ID: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    FullName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    Phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    Email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    Password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    Role: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    Status: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    LogTime: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    FailedAttempt: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    }
}, {
    tableName: 'Users', // Tên bảng phải là 'Users'
    timestamps: false, // Tắt các trường 'createdAt', 'updatedAt'
});

module.exports = User;
