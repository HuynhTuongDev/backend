const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createUserService = async (fullName, email, password) => {
    try {
        // Kiểm tra email đã tồn tại chưa
        const existingUser = await User.findOne({ where: { Email: email } });
        if (existingUser) {
            console.log("Email already exists");
            return null; // Hoặc trả về một thông báo lỗi
        }

        // Hash mật khẩu
        const hashPassword = await bcrypt.hash(password, saltRounds);

        // Tạo người dùng mới
        const newUser = await User.create({
            FullName: fullName,
            Email: email,
            Password: hashPassword,
            Role: 'Admin'
        });

        // Trả về người dùng mới tạo
        return newUser;
    } catch (error) {
        console.log("Error creating user:", error);
        return null;
    }
}
module.exports = {
    createUserService,
}