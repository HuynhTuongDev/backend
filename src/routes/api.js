const express = require('express');
const { createUser, getAllUser, checkUserLogin } = require('../controllers/userController');
const { getProducts } = require('../controllers/homeController');
const { getAllProducts } = require('../controllers/homeController');
const apirouter = express.Router();

//User API
apirouter.post('/users/register', createUser);
apirouter.get('/users/all', getAllUser);
apirouter.post('/users/login', checkUserLogin);

//Product API
apirouter.get('/products/sorted-and-paged', getProducts);
apirouter.get('/products/allproducts', getAllProducts);

// Export router để sử dụng ở nơi khác
module.exports = apirouter;
