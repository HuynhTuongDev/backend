const { User, Role } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/**
 * Dịch vụ tạo người dùng mới
 * @param {string} fullName - Tên đầy đủ
 * @param {string} email - Email người dùng
 * @param {string} password - Mật khẩu chưa mã hóa
 * @param {string} phone - Số điện thoại (tùy chọn)
 * @param {string} address - Địa chỉ (tùy chọn)
 * @returns {Object|null} - Thông tin người dùng đã được tạo hoặc null nếu xảy ra lỗi
 */
const createUserService = async (fullName, email, password, phone = null, address = null) => {
  try {
    // Hash mật khẩu của người dùng
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Lưu vào cơ sở dữ liệu
    const result = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
      address,
      roleID: 1, // Mặc định vai trò là 1 (giả định là vai trò "Người dùng")
      status: 'Active', // Trạng thái mặc định
    });

    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

/**
 * Dịch vụ lấy danh sách tất cả người dùng
 * @returns {Array|null} - Danh sách người dùng hoặc null nếu xảy ra lỗi
 */
const getAllUserService = async () => {
  try {
    const result = await User.findAll();
    return result;
  } catch (error) {
    console.error('Error fetching users:', error);
    return null;
  }
};

module.exports = {
  createUserService,
  getAllUserService,
};
