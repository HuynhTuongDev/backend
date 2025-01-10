const express = require('express');
const { createUser, getAllUser } = require('../controllers/userController');
const { getProducts } = require('../controllers/homeController');
const { getAllProducts } = require('../controllers/homeController');
const apirouter = express.Router();

// Định nghĩa các route
apirouter.post('/register', createUser);
apirouter.get('/users', getAllUser);
apirouter.get('/products/sorted-and-paged', getProducts);
apirouter.get('/products/allproducts', getAllProducts);
// Export router để sử dụng ở nơi khác
module.exports = apirouter;
