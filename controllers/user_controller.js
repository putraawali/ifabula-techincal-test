const { response } = require("../constants/general");
const { verify } = require("../helpers/jwt");

function UserController({ app, usecase }) {
    app.post("/user/register", async (req, res) => {
        const resp = { ...response };
        try {
            let body = req.body;
            await usecase.user.register(body);
            resp.code = 201;
        } catch (error) {
            resp.status = "error";
            resp.message = error;
            resp.code = 400;
        }

        return res.status(resp.code).json(resp);
    });

    app.post("/user/login", async (req, res) => {
        const resp = { ...response };
        try {
            let payload = req.body;
            let user = await usecase.user.login(payload);
            resp.data = user;
        } catch (error) {
            resp.status = "error";
            resp.message = error.message;
            if (resp.message.includes("password")) {
                resp.code = 400;
            } else {
                resp.code = 404;
            }
        }

        return res.status(resp.code).json(resp);
    });

    // auth
    app.use(async (req, res, next) => {
        const resp = { ...response };
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                resp.code = 401;
                resp.status = "error";
                resp.message = "please login first";
                return res.status(resp.code).json(resp);
            }

            let token = authorization.replace("Bearer ", "");

            let dataToVerif = verify(token);
            let user = await usecase.user.getById({
                id: dataToVerif.user_id,
            });
            req.userData = {
                user_id: user.user_id,
                email: user.email,
                is_admin: user.is_admin,
            };
            next();
        } catch (error) {
            resp.code = 500;
            resp.status = "error";
            resp.message = error;
            return res.status(resp.code).json(resp);
        }
    });

    app.get("/user/:id", async (req, res) => {
        const resp = { ...response };
        try {
            const { id } = req.params;
            let result = await usecase.user.getById({ id });
            resp.data = result;
        } catch (error) {
            resp.status = "error";
            resp.message = error.message;
            resp.code = 404;
        }

        return res.status(resp.code).json(resp);
    });
}

module.exports = { UserController };
