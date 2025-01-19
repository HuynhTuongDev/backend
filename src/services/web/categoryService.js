const db = require('../../models'); // Giả sử bạn đang sử dụng Sequelize hoặc một ORM khác

const getCategories = async () => {
    try {
        const result = await db.Category.findAll();
        return result;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Cannot fetch categories');
    }
}

module.exports = {
    getCategories,
};
