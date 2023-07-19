const bcrypt = require("bcryptjs");
const SALT = +process.env.SALT;

function hashPassword(password) {
    return bcrypt.hashSync(password, SALT);
}

function comparePassword(password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
}

module.exports = { hashPassword, comparePassword };
