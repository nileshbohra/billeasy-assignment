const sequelize = require('sequelize');
const dataTypes = sequelize.DataTypes;
const dbConnector = require('../config/dbConnector');
const User = require('./users');

module.exports = dbConnector.define('files', {
    id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: dataTypes.INTEGER,
        allowNull: false,
        refrences: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
    },
    original_filename: {
        type: dataTypes.STRING,
        allowNull: false
    },
    storage_path: {
        type: dataTypes.STRING,
        allowNull: false
    },
    title: {
        type: dataTypes.STRING,
        allowNull: false
    },
    file_type: {
        type: dataTypes.STRING,
        allowNull: false
    },
    file_size: {
        type: dataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: dataTypes.STRING,
    },
    status: {
        type: dataTypes.STRING,
        allowNull: false,
        defaultValue: 'uploaded',
        validate: {
            isIn: [['uploaded', 'processing', 'processed', 'failed']]
        }
    },
    extracted_data: {
        type: dataTypes.STRING,
    },
    uploaded_at: {
        type: dataTypes.DATE,
        allowNull: false,
        defaultValue: dataTypes.NOW
    }
}, {
    timestamps: false
});