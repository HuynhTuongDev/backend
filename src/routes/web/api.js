const express = require('express');
const { createUser, getAllUser } = require('../../controllers/web/userController');
const { getProducts } = require('../../controllers/web/productController');
const { getAllProducts } = require('../../controllers/web/productController');
const { getAllSlidersController } = require('../../controllers/web/sliderController');
const apirouter = express.Router();

//User API
apirouter.post('/users/register', createUser);
apirouter.get('/users/all', getAllUser);
apirouter.post('/users/login', checkUserLogin);

//Product API
apirouter.get('/products/sorted-and-paged', getProducts);
apirouter.get('/products/allproducts', getAllProducts);

apirouter.get('/slider', getAllSlidersController);

// Export router để sử dụng ở nơi khác
module.exports = apirouter;
