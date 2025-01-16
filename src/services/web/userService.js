const { User, Role } = require('../../models');

const createUserService = async (
    fullName,
    email,
    password,
    phone = null,
    address = null
) => {
    try {
        const result = await User.create({
            fullName,
            email,
            password,
            phone,
            address,
            roleID: 3,
            status: "Active",
        });

        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
};

const getAllUserService = async () => {
    try {
        const result = await User.findAll();
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
};

const getUserByEmail = async (email) => {
    try {
        const result = await User.findOne({ where: { email } });
        return result || null;
    } catch (error) {
        console.error("Error finding user by email:", error);
        return null;
    }
};

module.exports = {
    createUserService,
    getAllUserService,
    getUserByEmail,
};
