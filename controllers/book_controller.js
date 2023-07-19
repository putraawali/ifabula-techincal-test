const { response } = require("../constants/general");

function BookController({ app, usecase }) {
    app.get("/books", async (req, res) => {
        const resp = { ...response };
        try {
            let result = await usecase.book.getAllBook();
            resp.data = result;
        } catch (error) {
            resp.status = "error";
            resp.message = error;
            resp.code = 400;
        }

        return res.status(resp.code).json(resp);
    });

    app.get("/book/:id/detail", async (req, res) => {
        const resp = { ...response };
        try {
            if (!req.userData.is_admin) {
                resp.status = "error";
                resp.message = "Your are not admin";
                resp.code = 401;
                return res.status(resp.code).json(resp);
            }

            let book_id = req.params.id;
            let result = await usecase.book.getBookDetail({ id: book_id });
            resp.data = result;
        } catch (error) {
            resp.status = "error";
            resp.message = error.message;
            resp.code = 400;
        }

        return res.status(resp.code).json(resp);
    });

    app.post("/book/:id/rent", async (req, res) => {
        const resp = { ...response };
        try {
            const payload = {
                user_id: req.userData.user_id,
                book_id: req.params.id,
            };

            let result = await usecase.book.rentBook(payload);

            if (typeof result === typeof "") {
                resp.code = 201;
                resp.message = result;
            } else {
                resp.code = 400;
                resp.message = result.message;
                resp.status = "error";
            }
        } catch (error) {
            resp.status = "error";
            resp.message = error;
            resp.code = 400;
        }

        return res.status(resp.code).json(resp);
    });

    app.post("/book/:id/return", async (req, res) => {
        const resp = { ...response };
        try {
            const payload = {
                user_id: req.userData.user_id,
                book_id: req.params.id,
            };

            await usecase.book.returnBook(payload);
            resp.code = 200;
        } catch (error) {
            resp.status = "error";
            resp.message = error.message;
            resp.code = 400;
        }

        return res.status(resp.code).json(resp);
    });
}

module.exports = { BookController };
