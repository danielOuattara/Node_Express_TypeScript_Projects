"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Product name is required !"],
        trim: true,
        minLength: 2,
        maxLength: [100, "Product name, max 100 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price value is required !"],
        default: 0,
    },
    description: {
        type: String,
        required: [true, "Product description is required !"],
        maxLength: [1000, "Product description, is max 1,000 characters"],
    },
    image: {
        type: String,
        default: "/uploads/example.jpeg",
        required: [true, "Product image is required !"],
    },
    category: {
        type: String,
        required: [true, "Product category is required !"],
        enum: EnumCategory,
    },
    company: {
        type: String,
        required: [true, "Company is required !"],
        enum: {
            values: EnumCompany,
            message: "{VALUE} is not supported as company name",
        },
    },
    colors: {
        type: [String],
        default: ["#222"],
        required: [true, "Product color is required !"],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    freeShipping: {
        type: Boolean,
        default: false,
    },
    inventory: {
        type: Number,
        required: [true, "Inventory data is required !"],
        default: 15,
    },
    averageRating: {
        type: Number,
        default: 0,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Product_v2 = (0, mongoose_1.model)("Product", schema);
exports.default = Product_v2;
