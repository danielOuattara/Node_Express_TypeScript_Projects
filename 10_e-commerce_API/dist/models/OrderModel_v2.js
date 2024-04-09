"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const order_1 = require("../@types/order");
const SingleOrderItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
});
const schema = new mongoose_1.Schema({
    tax: {
        type: Number,
        required: true,
    },
    shippingFee: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    orderItems: [SingleOrderItemSchema],
    status: {
        type: String,
        values: Object.values(order_1.EnumStatus),
        default: order_1.EnumStatus.PENDING,
        message: "{VALUE} is not supported as category name",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    clientSecret: {
        type: String,
        required: true,
    },
    paymentId: {
        type: String,
    },
}, { timestamps: true });
const Order_v1 = (0, mongoose_1.model)("Order", schema);
exports.default = Order_v1;
