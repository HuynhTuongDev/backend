// src/services/productService.js
const db = require('../../models'); // Giả sử bạn đang sử dụng Sequelize hoặc một ORM khác

const getProductsService = async ({ sortOrder, page, size, categoryID }) => {
    try {
        // Xây dựng điều kiện tìm kiếm
        const whereClause = {};

        // Nếu có categoryID, thêm điều kiện lọc theo danh mục
        if (categoryID) {
            whereClause.categoryID = categoryID;
        }

        // Truy vấn sản phẩm từ database
        const products = await db.Product.findAll({
            where: whereClause,
            order: [['productID', sortOrder]], // Giữ lại việc sắp xếp theo productID
            limit: size,
            offset: page * size,
        });

        return products; // Trả về danh sách sản phẩm
    } catch (error) {
        console.error('Error fetching products from DB:', error.message);
        throw error;
    }
};
const getAllProductsService = async () => {
    try {
        // Truy vấn tất cả sản phẩm từ database
        const products = await db.Product.findAll();
        return products; // Trả về danh sách sản phẩm
    } catch (error) {
        console.error('Error fetching products from DB:', error.message);
        throw error; // Ném lỗi nếu có vấn đề xảy ra
    }
};

module.exports = {
    getProductsService,
    getAllProductsService,
};
