const { createUserService, getAllUserService } = require('../services/userService')

const createUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    const data = await createUserService(fullName, email, password);
    return res.status(200).json(data);
}

const getAllUser = async (req, res) => {
    const data = await getAllUserService();
    return res.status(200).json(data);
}

module.exports = {
    createUser,
    getAllUser,
}