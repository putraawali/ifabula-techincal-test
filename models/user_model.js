const { db } = require("../db/connection");
const { DataTypes } = require("sequelize");
const { Book } = require("./book_model");
const { UserBook } = require("./user_book_transaction_model");
const { hashPassword } = require("../helpers/bcrypt");

const User = db.define(
    "User",
    {
        user_id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                validatePassword: (password) => {
                    if (password.length < 8) {
                        throw new Error(
                            "Password must be more than 8 characters"
                        );
                    }

                    let pattern =
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/gm;

                    if (!password.match(pattern)) {
                        throw new Error(
                            "Password must be alphanumeric characters and must contain at least 1 capital letters, may not contain special characters."
                        );
                    }
                },
            },
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.TIME,
        },
        updated_at: {
            type: DataTypes.TIME,
        },
    },
    {
        tableName: "users",
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false,
        hooks: {
            beforeCreate: (user, _) => {
                user.password = hashPassword(user.password);
            },
        },
    }
);

User.belongsToMany(Book, {
    through: UserBook,
    foreignKey: "user_id",
    otherKey: "book_id",
});

module.exports = { User };
