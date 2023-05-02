"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    imageUrl: {
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
    isResponsable: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)('User', userSchema);
