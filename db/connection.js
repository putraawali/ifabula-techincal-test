const { Sequelize } = require("sequelize");
const db = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_PG_HOST,
    port: process.env.DB_PG_PORT,
    database: process.env.DB_PG_DB_NAME,
    username: process.env.DB_PG_USER,
    password: process.env.DB_PG_PASS,
});

module.exports = { db };
