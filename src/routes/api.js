// src/routes/userRoutes.js
const express = require('express');
const { createUser, getAllUser } = require('../controllers/userController')

const apirouter = express.Router();

apirouter.post('/register', createUser);

apirouter.get('/users', getAllUser);

module.exports = apirouter;
