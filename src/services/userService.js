const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createUserService = async (fullName, email, password) => {
    try {
        //hash User Passwword 
        const hashPasswword = await bcrypt.hash(password, saltRounds)
        //save to database
        let result = await User.create({
            FullName: fullName,
            Email: email,
            Password: hashPasswword,
            Role: 'Admin'
        })
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
module.exports = {
    createUserService,
}