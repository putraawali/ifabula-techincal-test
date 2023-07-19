const { BookController } = require("./book_controller");
const { UserController } = require("./user_controller");

function BaseController({ app, usecase }) {
    UserController({ app, usecase });
    BookController({ app, usecase });
}

module.exports = { BaseController };
