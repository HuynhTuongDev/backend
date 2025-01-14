const {
  createUserService,
  getAllUserService,
  getUserByEmail,
} = require("../services/userService");

const bcrypt = require("bcrypt");
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

    bcrypt.hash(password, saltRounds, async (err, hashed) => {
      if (err) {
        res.status(500).send({ message: "Failed to create user", error: err });
      }
      const data = await createUserService(
        fullName,
        email,
        hashed,
        phone,
        address
      );
      res.status(200).json(data);
    });
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
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(401).json({
            message: "Invalid credentials",
          });
        }

        if (result) {
          res.status(200).json({
            message: "Login successful",
            user,
          });
        } else {
          res.status(401).json({
            message: "Invalid credentials",
          });
        }
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials",
      });
    }
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
