// controllers/sliderController.js
const { getAllSlidersService } = require('../../services/web/sliderService');

// Lấy tất cả sliders và trả về dưới dạng JSON
const getAllSlidersController = async (req, res) => {
    try {
        // Gọi service để lấy dữ liệu sliders
        const sliders = await getAllSlidersService();
        return res.json({
            data: sliders,
        });
    } catch (error) {
        console.error('Error in controller:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllSlidersController,
};
