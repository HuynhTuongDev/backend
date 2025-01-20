// src/controllers/homeController.js
const productService = require('../../services/web/productService');

const getProducts = async (req, res) => {
    try {
        let { sortOrder, page, size, sortBy } = req.query;

        // Kiểm tra và xử lý các tham số đầu vào
        page = Math.max(parseInt(page) || 0, 0);
        size = parseInt(size) || 10;
        sortOrder = (sortOrder === 'desc' ? 'desc' : 'asc'); // Mặc định là 'asc' nếu không có giá trị

        // Nếu categoryID có trong query, thêm vào đối số
        const filterCriteria = {
            sortOrder,
            page,
            size,
            sortBy,
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

const getProductsByFilter = async (req, res) => {
    try {
        const { brand, category } = req.query; // Lấy giá trị từ query parameters

        // Điều kiện lọc
        const filter = {};
        if (brand) filter.brandID = brand;
        if (category) filter.categoryID = category;

        // Kiểm tra nếu không có bộ lọc nào
        if (Object.keys(filter).length === 0) {
            const products = await productService.getAllProductsService();
        }

        // Gọi service để lấy sản phẩm dựa trên filter
        const products = await productService.getProductsByFilterService(filter);

        // Thêm đường dẫn đầy đủ cho ảnh
        const productsWithFullImageLinks = products.map(product => ({
            ...product.dataValues,
            imageURL: `http://localhost:8082/${product.imageURL}`
        }));

        // Trả về danh sách sản phẩm
        return res.status(200).json(productsWithFullImageLinks);
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm:", error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy sản phẩm.' });
    }
};

module.exports = {
    getProducts,
    getProductsByFilter,
};
