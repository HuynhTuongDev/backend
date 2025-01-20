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
        // Lấy các sản phẩm có brandID tương ứng
        const products = await db.Product.findAll({
        });
        return products;
    } catch (error) {
        console.error("Lỗi khi lấy tất cảcả sản phẩm:", error);
        throw new Error("Không thể lấy tất cả sản phẩm");
    }
};
const getProductsByFilterService = async (filter) => {
    try {
        // Truy vấn cơ sở dữ liệu với các điều kiện lọc
        const products = await db.Product.findAll({
            where: {
                ...(filter.brandID && { brandID: filter.brandID }),
                ...(filter.categoryID && { categoryID: filter.categoryID })
            }
        });

        return products;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo bộ lọc:", error);
        throw new Error("Không thể lấy sản phẩm theo bộ lọc");
    }
};
module.exports = {
    getProductsService,
    getAllProductsService,
    getProductsByFilterService,
};
