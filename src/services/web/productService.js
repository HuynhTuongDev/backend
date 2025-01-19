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
const getProductsByBrandService = async (brandID) => {
    try {
        // Lấy các sản phẩm có brandID tương ứng
        const products = await db.Product.findAll({
            where: {
                brandID: brandID
            }
        });
        return products;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo thương hiệu:", error);
        throw new Error("Không thể lấy sản phẩm theo thương hiệu");
    }
};
const getProductsByCategoryService = async (id) => {
    try {
        const products = await db.Product.findAll({
            where: {
                categoryID: id
            }
        })
        return products;
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo danh muc:", error);
        throw new Error("Không thể lấy sản phẩm theo danh muc");
    }
};
// const getProducts = async (req, res) => {
//     try {
//         const { page, limit, sort, brandID, categoryID } = req.query;

//         // Xử lý giá trị mặc định
//         const pageNumber = parseInt(page, 10) || 1; // Trang mặc định = 1
//         const pageSize = parseInt(limit, 10) || 10; // Số sản phẩm mặc định = 10
//         const offset = (pageNumber - 1) * pageSize;

//         // Xử lý điều kiện lọc
//         const filters = {};
//         if (brandID) filters.brandID = brandID;
//         if (categoryID) filters.categoryID = categoryID;

//         // Query dữ liệu từ database
//         const products = await Product.findAll({
//             where: filters,
//             order: sort ? [[sort, 'ASC']] : [], // Sắp xếp nếu có `sort`
//             limit: pageSize,
//             offset: offset,
//         });

//         // Trả về kết quả
//         res.status(200).json({
//             products,
//             pagination: {
//                 page: pageNumber,
//                 limit: pageSize,
//             },
//         });
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({ error: 'Failed to fetch products' });
//     }
// };

module.exports = {
    getProductsService,
    getAllProductsService,
    getProductsByBrandService,
    getProductsByCategoryService,
    // getProducts,
};
