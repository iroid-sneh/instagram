import dotenv from "dotenv";
dotenv.config();

module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASS || "Sneh27*",
    DB: process.env.DB_NAME || "Instagram",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
