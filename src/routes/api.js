// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    return res.status(200).json("Hello world api")
});
module.exports = router;
