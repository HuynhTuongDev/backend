require('dotenv').config();
const express = require('express'); // Sử dụng express
const apiRoutes = require('./routes/api'); // Đảm bảo bạn có tệp routes/api.js cho các API

// Khởi tạo express app
const app = express();
const port = process.env.PORT || 8888;

// Cấu hình xử lý body request (dành cho JSON và form data)
app.use(express.json()); // for JSON
app.use(express.urlencoded({ extended: true })); // for form data

// Khai báo API routes
app.use('/api', apiRoutes); // API route sẽ được định nghĩa trong ./routes/api.js

// Lắng nghe server
app.listen(port, () => {
    console.log(`Backend Nodejs App listening on port ${port}`);
});
