const { Sequelize, Op } = require("sequelize");
const { UserBook } = require("../models/user_book_transaction_model");

/* Define table user_book_transaction and each function implementation
 * @param: database connection | Dependency Injection
 * @return: object of function implementation
 */
async function UserBookTransactionRepository({ db }) {
    return {
        Create: async function (payload) {
            try {
                await UserBook.create(payload);
            } catch (error) {
                throw Error(error);
            }
        },
        getActiveRentBookByUserID: async function ({ user_id }) {
            try {
                let result = await UserBook.findOne({
                    where: {
                        user_id: user_id,
                        [Op.and]: {
                            returned_at: null,
                        },
                    },
                });

                return result;
            } catch (error) {
                throw Error(error);
            }
        },
        getActiveRentBookByBookID: async function ({ book_id }) {
            try {
                let result = await UserBook.findOne({
                    where: {
                        book_id: book_id,
                        [Op.and]: {
                            returned_at: null,
                        },
                    },
                });

                return result.toJSON();
            } catch (error) {
                throw Error(error);
            }
        },
        returnBookByID: async function (transaction_id) {
            try {
                let result = await UserBook.update(
                    {
                        returned_at: new Date(),
                    },
                    {
                        where: {
                            transaction_id: transaction_id,
                        },
                    }
                );

                return result;
            } catch (error) {
                throw Error(error);
            }
        },
    };
}

module.exports = { UserBookTransactionRepository };
