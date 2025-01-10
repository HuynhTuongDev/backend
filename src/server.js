require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api'); // Import đúng tệp userRoutes
const path = require('path');

const app = express();
const port = process.env.PORT || 8888;

const corsOptions = {
    origin: '*', // Cho phép tất cả các nguồn truy cập
};
app.use(cors(corsOptions));

// Cấu hình xử lý body request (dành cho JSON và form data)
app.use(express.json()); // Xử lý dữ liệu JSON
app.use(express.urlencoded({ extended: true })); // Xử lý form data

// Cấu hình tệp tĩnh
app.use('/images', express.static(path.join(__dirname, 'images'))); // Dùng để phục vụ hình ảnh từ thư mục 'images'

// Sử dụng các API routes
app.use('/api', apiRoutes); // Dùng userRoutes cho các route bắt đầu bằng /api

// Lắng nghe server
app.listen(port, () => {
    console.log(`Backend Nodejs App listening on port ${port}`);
});
