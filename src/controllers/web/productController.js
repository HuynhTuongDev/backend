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
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProductsService();
        const productsWithFullImageLinks = products.map(product => {
            product.imageURL = `http://localhost:8082/${product.imageURL}`;
            return product;
        });
        if (productsWithFullImageLinks.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.error("Lỗi trong controller:", error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy sản phẩm.' });
    }
};

const getProductsByBrand = async (req, res) => {
    const { brandID } = req.params;

    try {
        const products = await productService.getProductsByBrandService(brandID); // Gọi dịch vụ để lấy sản phẩm
        const productsWithFullImageLinks = products.map(product => {
            product.imageURL = `http://localhost:8082/${product.imageURL}`;
            return product;
        });
        if (productsWithFullImageLinks.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm cho thương hiệu này.' });
        }
        return res.status(200).json(productsWithFullImageLinks);
    } catch (error) {
        console.error("Lỗi trong controller:", error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy sản phẩm.' });
    }
};
const getProductsByCategory = async (req, res) => {
    const { categoryID } = req.params;
    try {
        const products = await productService.getProductsByCategoryService(categoryID);
        const productsWithFullImageLinks = products.map(product => {
            product.imageURL = `http://localhost:8082/${product.imageURL}`;
            return product;
        });
        if (productsWithFullImageLinks.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm cho thương hiệu này.' });
        }
        return res.status(200).json(productsWithFullImageLinks);
    } catch (error) {
        console.error("Lỗi trong controller:", error);
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy sản phẩm.' });
    }
};
module.exports = {
    getProducts,
    getAllProducts,
    getProductsByBrand,
    getProductsByCategory,
};
