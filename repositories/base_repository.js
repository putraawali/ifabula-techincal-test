const { UserRepository } = require("./user_repository");
const { BookRepository } = require("./book_repository");
const {
    UserBookTransactionRepository,
} = require("./user_book_transaction_repository");

async function BaseRepository({ db }) {
    return {
        user: await UserRepository({ db }),
        book: await BookRepository({ db }),
        transaction: await UserBookTransactionRepository({ db }),
    };
}

module.exports = { BaseRepository };
