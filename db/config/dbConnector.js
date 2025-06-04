require('dotenv').config();
const Sequelize = require('sequelize');

let connector;
if (process.env.REMOTE_DB_URL) {
    connector = new Sequelize(process.env.REMOTE_DB_URL);
} else {
    connector = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: process.env.DB_DIALECT,
        }
    );
}

module.exports = connector;