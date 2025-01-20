const express = require('express');
const { createUser, getAllUser, checkUserLogin } = require('../../controllers/web/userController');
const { getProducts, getProductsByFilter } = require('../../controllers/web/productController');
const { getAllBrands } = require('../../controllers/web/brandController');
const { getAllCategories } = require('../../controllers/web/categoryController');
const { getAllSlidersController } = require('../../controllers/web/sliderController');
const apirouter = express.Router();

//User API
apirouter.post('/users/register', createUser);
apirouter.get('/users/all', getAllUser);
apirouter.post('/users/login', checkUserLogin);

//Product API
apirouter.get('/products/sorted-and-paged', getProducts);
apirouter.get('/collections', getProductsByFilter); // Sử dụng query parameters


apirouter.get('/slider', getAllSlidersController);

apirouter.get('/brands', getAllBrands)
apirouter.get('/categories', getAllCategories)
// Export router để sử dụng ở nơi khác
module.exports = apirouter;
