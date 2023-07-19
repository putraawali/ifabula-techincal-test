const { db } = require("../db/connection");
const { DataTypes } = require("sequelize");

const Book = db.define(
    "Book",
    {
        book_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        created_at: {
            type: DataTypes.TIME,
        },
        updated_at: {
            type: DataTypes.TIME,
        },
    },
    {
        tableName: "books",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = { Book };
