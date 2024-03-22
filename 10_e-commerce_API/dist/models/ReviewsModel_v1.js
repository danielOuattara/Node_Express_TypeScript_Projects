"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Please provide a rating"],
    },
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide a title"],
        maxLength: 100,
    },
    comment: {
        type: String,
        trim: true,
        required: [true, "Please provide a comment"],
        maxLength: [500, "Comment is max 500 characters"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
}, { timestamps: true });
schema.index({ product: 1, user: 1 }, { unique: true });
const Model_v1 = (0, mongoose_1.model)("Review", schema);
exports.default = Model_v1;
