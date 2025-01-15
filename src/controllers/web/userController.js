const {
    createUserService,
    getAllUserService,
    getUserByEmail,
} = require("../../services/web/userService");

const bcrypt = require("bcryptjs");
const saltRounds = 10;
const createUser = async (req, res) => {
    try {
        const { fullName, email, password, phone, address } = req.body;

        const checkEmailExists = await getUserByEmail(email);
        if (checkEmailExists) {
            res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const data = await createUserService(
            fullName,
            email,
            hashedPassword,
            phone,
            address
        );
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Failed to create user", error: error });
    }
};

const getAllUser = async (req, res) => {
    try {
        const data = await getAllUserService();
        console.log(data);
        res.status(200).json(data);
    } catch {
        console.log(error);
        res.status(500).send({ message: "Failed to get users", error: error });
    }
};

const checkUserLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await getUserByEmail(email);
        if (user) {
            const checkUserPassword = await bcrypt.compare(password, user.password);

            if (checkUserPassword) {
                res.status(200).json({
                    message: "Login successful",
                    user,
                });
            }
        }

        res.status(401).json({
            message: "Invalid credentials",
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({
            message: "An error occurred while processing the request",
        });
    }
};

module.exports = {
    createUser,
    getAllUser,
    checkUserLogin,
};
