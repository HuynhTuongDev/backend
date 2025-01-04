// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Cấu hình Sequelize cho PostgreSQL
const sequelize = new Sequelize({
    host: process.env.DB_HOST || '127.0.0.1', // Lấy thông tin từ .env hoặc sử dụng giá trị mặc định
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'ecommercedb',
    dialect: 'postgres', // Hoặc dialect khác nếu bạn sử dụng MySQL, SQLite, etc.
    logging: false, // Tắt log các truy vấn (nếu không cần thiết)
});

// Kiểm tra kết nối với cơ sở dữ liệu
async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {
    sequelize,
    connectToDatabase
};
