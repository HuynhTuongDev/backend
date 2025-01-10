// src/controllers/homeController.js
const productService = require('../services/productService');

const getProducts = async (req, res) => {
    try {
        let { sortOrder, page, size, categoryID } = req.query;

        // Kiểm tra và xử lý các tham số đầu vào
        page = Math.max(parseInt(page) || 0, 0);
        size = parseInt(size) || 10;
        sortOrder = (sortOrder === 'desc' ? 'desc' : 'asc'); // Mặc định là 'asc' nếu không có giá trị

        // Nếu categoryID có trong query, thêm vào đối số
        const filterCriteria = {
            sortOrder,
            page,
            size,
            categoryID: categoryID ? parseInt(categoryID) : undefined, // Chỉ truyền categoryID nếu có
        };

        // Gọi service để lấy sản phẩm
        const products = await productService.getProductsService(filterCriteria);

        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        // Cập nhật link ảnh
        const productsWithFullImageLinks = products.map(product => {
            product.imageURL = `http://localhost:8082/${product.imageURL}`;
            return product;
        });

        return res.status(200).json({
            message: 'Products retrieved successfully',
            data: productsWithFullImageLinks,
        });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProductsService(); // Lấy dữ liệu từ service
        const productsWithFullImageLinks = products.map(product => {
            product.imageURL = `http://localhost:8082/${product.imageURL}`;
            return product;
        });
        // Trả về kết quả dưới dạng mảng
        return res.status(200).json({
            data: productsWithFullImageLinks // Trả về mảng sản phẩm
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).json({
            message: 'Lỗi khi lấy sản phẩm',
            error: error.message,
        });
    }
};


module.exports = {
    getProducts,
    getAllProducts,

};
