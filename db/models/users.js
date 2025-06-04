const sequelize = require('sequelize');
const dataTypes = sequelize.DataTypes;
const dbConnector = require('../config/dbConnector');

module.exports = dbConnector.define('users', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: dataTypes.STRING,
        allowNull: false
    },
    role: {
        type: dataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['admin', 'user']]
        }
    }
}, { timestamps: true });