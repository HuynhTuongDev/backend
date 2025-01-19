const CategoryService = require('../../services/web/categoryService');

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryService.getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    getAllCategories
};
