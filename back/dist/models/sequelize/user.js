"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sql_db_1 = require("../../db/sql-db");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    lastname: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    address: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    additionalAddress: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true
    },
    postcode: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    town: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    confirmed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    admin: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isResponsable: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    service: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sql_db_1.sequelize,
    tableName: 'User',
    timestamps: true,
    updatedAt: false
});
exports.default = User;
