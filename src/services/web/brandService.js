const db = require('../../models'); // Import pool kết nối

const getBrands = async () => {
    try {
        const result = await db.Brand.findAll();
        return result;
    } catch (error) {
        console.error('Error fetching brands:', error);
        throw new Error('Cannot fetch brands');
    }
}

module.exports = {
    getBrands,
};
