"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const sql_db_1 = require("../../db/sql-db");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
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
    address: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    additionalAddress: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: true
    },
    postcode: {
        type: sequelize_1.DataTypes.CHAR(15),
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
    service: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    updateDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: sql_db_1.sequelize,
    tableName: 'User',
    timestamps: false,
    hooks: {
        beforeCreate: (user, options) => {
            const now = new Date();
            const timezoneOffset = 2;
            const timezoneOffsetMs = timezoneOffset * 60 * 60 * 1000;
            const frenchDate = new Date(now.getTime() + timezoneOffsetMs);
            const formattedFrenchDate = frenchDate.toISOString().slice(0, 19).replace('T', ' ');
            user.creationDate = formattedFrenchDate;
        }
    }
});
