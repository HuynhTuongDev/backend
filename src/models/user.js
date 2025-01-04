const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    // ID: Tự động tạo BIGSERIAL trong PostgreSQL
    id: {
        type: DataTypes.BIGINT, // Trường ID kiểu BIGINT (tương đương BIGSERIAL trong PostgreSQL)
        primaryKey: true, // Đánh dấu đây là khóa chính
        autoIncrement: true, // Tự động tăng
    },
    fullName: {
        type: DataTypes.STRING(255), // Kiểu VARCHAR(255)
        allowNull: false, // Không thể null
    },
    address: {
        type: DataTypes.STRING(255), // Kiểu VARCHAR(255)
        allowNull: true, // Có thể null
    },
    phone: {
        type: DataTypes.STRING(20), // Kiểu VARCHAR(20)
        allowNull: true, // Có thể null
    },
    email: {
        type: DataTypes.STRING(255), // Kiểu VARCHAR(255)
        allowNull: false, // Không thể null
        unique: true, // Đảm bảo email là duy nhất
    },
    password: {
        type: DataTypes.STRING(255), // Kiểu VARCHAR(255)
        allowNull: false, // Không thể null
    },
    role: {
        type: DataTypes.STRING(50), // Kiểu VARCHAR(50)
        allowNull: true, // Có thể null
    },
    status: {
        type: DataTypes.STRING(50), // Kiểu VARCHAR(50)
        allowNull: true, // Có thể null
    },
    logTime: {
        type: DataTypes.DATE, // Kiểu TIMESTAMP
        allowNull: true, // Có thể null
    },
    failedAttempt: {
        type: DataTypes.INTEGER, // Kiểu INTEGER
        defaultValue: 0, // Giá trị mặc định là 0
    }
}, {
    tableName: 'Users', // Đảm bảo tên bảng là 'Users'
    timestamps: false, // Không tạo các trường createdAt, updatedAt tự động
});

module.exports = User;
