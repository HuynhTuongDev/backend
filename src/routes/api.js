// src/routes/userRoutes.js
const express = require('express');
const { createUser } = require('../controllers/userController')

const apirouter = express.Router();

apirouter.post('/register', createUser)

module.exports = apirouter;
