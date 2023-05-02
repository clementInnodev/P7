"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    additionalAddress: {
        type: String,
        required: false
    },
    postcode: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    confirmed: {
        type: Boolean,
        required: true,
        default: false
    },
    birthday: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    creationDate: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        set: () => {
            const now = new Date();
            const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
            return formattedDate;
        }
    },
    updateDate: {
        type: mongoose_1.Schema.Types.Date,
        required: false
    }
}, {
    timestamps: false
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
