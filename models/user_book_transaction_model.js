const { db } = require("../db/connection");
const { DataTypes } = require("sequelize");

const UserBook = db.define(
    "Details",
    {
        transaction_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        borrowed_at: {
            type: DataTypes.TIME,
        },
        returned_at: {
            type: DataTypes.TIME,
        },
        late_before: {
            type: DataTypes.TIME,
        },
        created_at: {
            type: DataTypes.TIME,
        },
        updated_at: {
            type: DataTypes.TIME,
        },
    },
    {
        tableName: "user_book_transaction",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
        hooks: {
            beforeCreate: (user_book, _) => {
                user_book.borrowed_at = new Date();

                let date = new Date();
                date.setDate(date.getDate() + 7);
                user_book.late_before = date;
            },
        },
    }
);

module.exports = { UserBook };
