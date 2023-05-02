"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    UserId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
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
exports.PostModel = (0, mongoose_1.model)('Post', postSchema);
