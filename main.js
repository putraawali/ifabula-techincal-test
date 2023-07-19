require("dotenv").config();

const { connection } = require("./db/pg");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
const port = process.env.APP_PORT || 3000;

const { Server } = require("./app");

connection()
    .then((db) => {
        Server({
            app: app,
            db: db,
        });

        app.listen(port, () => console.log(`Project running on port ${port}`));
    })
    .catch((err) => {
        console.error(err);
    });
