const { comparePassword } = require("../helpers/bcrypt");
const { sign } = require("../helpers/jwt");

function UserUsecase({ repository }) {
    return {
        register: async function (payload) {
            try {
                let result = await repository.user.register(payload);
                return result;
            } catch (error) {
                throw error.message;
            }
        },
        getById: async function ({ id }) {
            try {
                let user = await repository.user.getDetailByID({ id });
                return user;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        login: async function (payload) {
            try {
                let user = await repository.user.getByEmail({
                    email: payload.email,
                });

                if (!comparePassword(payload.password, user.password)) {
                    throw new Error("Wrong password");
                }

                let token = sign({
                    user_id: user.user_id,
                    email: user.email,
                    is_admin: user.is_admin,
                });

                return { token };
            } catch (error) {
                if (error.message) {
                    throw new Error(error.message);
                }

                throw new Error(error);
            }
        },
        // getAll: async function () {
        //     return await repository.user.getAll();
        // },
        // getById: async function ({ id }) {
        //     let response = {
        //         data: null,
        //         error: null,
        //     };

        //     try {
        //         let result = await repository.user.getDetailByID({ id });
        //         if (result != null) {
        //             response.data = result;
        //         } else {
        //             response.error = "Data not found";
        //         }
        //     } catch (error) {
        //         return (response.error = error);
        //     }

        //     return response;
        // },
    };
}

module.exports = { UserUsecase };
