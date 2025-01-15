// services/sliderService.js
const db = require('../../models'); // Giả sử bạn đang sử dụng Sequelize hoặc một ORM khác
// Lấy tất cả sliders
const getAllSlidersService = async () => {
    try {
        // Lấy tất cả slider từ database
        const sliders = await db.Slider.findAll();
        // Chuyển đổi dữ liệu sang định dạng JSON trước khi trả về
        return sliders.map(slider => slider.get());
    } catch (error) {
        console.error('Error fetching sliders:', error);
        throw new Error('Failed to fetch sliders');
    }
};

module.exports = {
    getAllSlidersService,
};
