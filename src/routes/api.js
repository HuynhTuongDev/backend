// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Lấy tất cả người dùng
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
