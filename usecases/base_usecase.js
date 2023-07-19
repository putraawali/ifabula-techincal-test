const { BookUsecase } = require("./book_usecase");
const { UserUsecase } = require("./user_usecase");

function BaseUsecase({ repository }) {
    return {
        user: UserUsecase({ repository }),
        book: BookUsecase({ repository }),
    };
}

module.exports = { BaseUsecase };
