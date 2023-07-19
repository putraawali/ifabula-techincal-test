const { Book } = require("../models/book_model");
const { User } = require("../models/user_model");

/* Define table users and each function implementation
 * @param: database connection | Dependency Injection
 * @return: object of function implementation
 */
async function UserRepository({ db }) {
    return {
        getByPk: async function ({ id }) {
            try {
                let result = await User.findByPk(id);

                if (!result) {
                    throw new Error("user not found");
                }

                return result.toJSON();
            } catch (error) {
                throw error;
            }
        },
        getDetailByID: async function ({ id }) {
            try {
                let result = await User.findByPk(id, {
                    include: Book,
                });
                if (!result) {
                    throw new Error("user not found");
                }

                return result.toJSON();
            } catch (error) {
                throw error;
            }
        },
        register: async function (payload) {
            try {
                let result = await User.create(payload);
                return result;
            } catch (error) {
                let err = error.errors[0].message;
                if (err.includes("unique")) {
                    err = "email already registered";
                } else if (err.includes("isEmail")) {
                    err = "wrong email format";
                }

                throw Error(err);
            }
        },
        getByEmail: async function ({ email }) {
            try {
                let result = await User.findOne({
                    where: {
                        email: email,
                    },
                });

                if (!result) {
                    throw new Error("user not found");
                }

                return result;
            } catch (error) {
                throw error;
            }
        },
    };
}

module.exports = { UserRepository };
