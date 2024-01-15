"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "product name must be provided"],
        trim: true,
        maxlength: [50, "Max length 50 chars"],
    },
    price: {
        type: Number,
        required: [true, "price must be provided"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    company: {
        type: String,
        enum: {
            values: ["ikea", "liddy", "caressa", "marcos"],
            message: "{VALUE} is not supported",
        },
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, { timestamps: true });
const Product = (0, mongoose_1.model)("Product", ProductSchema);
exports.default = Product;
