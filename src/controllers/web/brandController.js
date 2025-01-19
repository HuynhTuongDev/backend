const BrandService = require('../../services/web/brandService');

const getAllBrands = async (req, res) => {
    try {
        const brands = await BrandService.getBrands();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Trả về lỗi nếu có lỗi
    }
}
module.exports = {
    getAllBrands
};
