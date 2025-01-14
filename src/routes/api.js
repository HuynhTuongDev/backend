const express = require('express');
const { createUser, getAllUser } = require('../controllers/userController');
const { getProducts } = require('../controllers/productController');
const { getAllProducts } = require('../controllers/productController');
const { getAllSlidersController } = require('../controllers/sliderController');
const apirouter = express.Router();

// Định nghĩa các route
apirouter.post('/register', createUser);
apirouter.get('/users', getAllUser);
apirouter.get('/products/sorted-and-paged', getProducts);
apirouter.get('/products/allproducts', getAllProducts);
apirouter.get('/slider', getAllSlidersController);
// Export router để sử dụng ở nơi khác
module.exports = apirouter;
