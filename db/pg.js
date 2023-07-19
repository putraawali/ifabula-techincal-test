const { db } = require("./connection");

async function connection() {
    try {
        await db.authenticate();
        console.log("Success connect postgres");
    } catch (error) {
        console.log("Failed connect postgres, error: %s", error);
        process.exit(500);
    }

    return db;
}

module.exports = { connection };
