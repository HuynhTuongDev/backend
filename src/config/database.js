const { Sequelize } = require('sequelize');
require('dotenv').config();  // Đảm bảo rằng dotenv đã được import

// Cấu hình Sequelize cho PostgreSQL từ .env hoặc giá trị mặc định
const sequelize = new Sequelize({
    host: process.env.DB_HOST || '127.0.0.1',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'ecommercedb',
    dialect: 'postgres', // Hoặc MySQL, SQLite nếu bạn sử dụng khác
    logging: false, // Tắt logging các query (nếu không cần thiết)
});

module.exports = sequelize;
