function BookUsecase({ repository }) {
    return {
        rentBook: async function (payload) {
            try {
                let book = await repository.book.getById({
                    id: payload.book_id,
                });

                if (!book.status) {
                    return new Error("This book is still rented");
                }

                let activeRentBook =
                    await repository.transaction.getActiveRentBookByUserID({
                        user_id: payload.user_id,
                    });

                if (activeRentBook) {
                    return new Error("You have an active rent book");
                }

                await repository.transaction.Create(payload);
                await repository.book.updateBookStatusByID(
                    payload.book_id,
                    false
                );
                return "Success rent book";
            } catch (error) {
                throw error.message;
            }
        },
        returnBook: async function (payload) {
            try {
                let activeRentBook =
                    await repository.transaction.getActiveRentBookByUserID({
                        user_id: payload.user_id,
                    });

                if (!activeRentBook) {
                    throw new Error("You don't have any book to return");
                }

                await repository.transaction.returnBookByID(
                    activeRentBook.transaction_id
                );
                await repository.book.updateBookStatusByID(
                    payload.book_id,
                    true
                );
                return;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        getAllBook: async function () {
            try {
                let result = await repository.book.getAll();
                return result;
            } catch (error) {
                throw Error(error);
            }
        },
        getBookDetail: async function ({ id }) {
            try {
                let book = await repository.book.getById({ id });
                if (!book.status) {
                    let rent =
                        await repository.transaction.getActiveRentBookByBookID({
                            book_id: id,
                        });
                    let user = await repository.user.getByPk({
                        id: rent.user_id,
                    });
                    book.borrower = user;
                } else {
                    book.borrower = null;
                }

                return book;
            } catch (error) {
                throw new Error(error.message);
            }
        },
    };
}

module.exports = { BookUsecase };
