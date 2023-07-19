const { Book } = require("../models/book_model");
const { User } = require("../models/user_model");

/* Define table books and each function implementation
 * @param: database connection | Dependency Injection
 * @return: object of function implementation
 */
async function BookRepository({ db }) {
    return {
        getById: async function ({ id }) {
            try {
                let book = await Book.findByPk(id);
                if (!book) {
                    throw new Error("book not found");
                }
                return book.toJSON();
            } catch (error) {
                throw new Error(error.message);
            }
        },
        updateBookStatusByID: async function (book_id, status) {
            try {
                return await Book.update(
                    { book_id, status },
                    { where: { book_id: book_id } }
                );
            } catch (error) {
                throw new Error(error.message);
            }
        },
        getAll: async function () {
            try {
                let books = await Book.findAll();
                return books;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    };
}

module.exports = { BookRepository };
