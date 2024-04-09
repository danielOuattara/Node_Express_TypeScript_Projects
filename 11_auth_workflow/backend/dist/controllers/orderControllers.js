"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.getCurrentUserOrders = exports.getSingleOrder = exports.getAllOrders = exports.createOrder = void 0;
const http_status_codes_1 = require("http-status-codes");
const OrderModel_1 = __importDefault(require("../models/OrderModel"));
const ProductModel_1 = __importDefault(require("../models/ProductModel"));
const errors_1 = require("../errors");
const utilities_1 = require("../utilities");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.cartItems || req.body.cartItems.length < 1) {
        throw new errors_1.BadRequestError("No cart items provided");
    }
    if (!req.body.tax || !req.body.shippingFee) {
        throw new errors_1.BadRequestError("Please provide tax and shipping fee");
    }
    let orderItems = [];
    let subtotal = 0;
    for (const item of req.body.cartItems) {
        const itemInDatabase = yield ProductModel_1.default.findOne({ _id: item.product });
        if (!itemInDatabase) {
            throw new errors_1.NotFoundError(`No product with id : ${item.product}`);
        }
        const singleValidOrderItem = {
            amount: item.amount,
            name: itemInDatabase.name,
            price: itemInDatabase.price,
            image: itemInDatabase.image,
            product: itemInDatabase._id,
        };
        orderItems = [...orderItems, singleValidOrderItem];
        subtotal += item.amount * itemInDatabase.price;
    }
    const total = req.body.tax + req.body.shippingFee + subtotal;
    const paymentIntent = yield (0, utilities_1.fakeStripAPI)({ amount: total, currency: "usd" });
    const order = yield OrderModel_1.default.create({
        tax: req.body.tax,
        shippingFee: req.body.shippingFee,
        subtotal,
        total,
        orderItems,
        user: req.user._id,
        clientSecret: paymentIntent.clientSecret,
    });
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ order, clientSecret: order.clientSecret });
});
exports.createOrder = createOrder;
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield OrderModel_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: orders.length, orders });
});
exports.getAllOrders = getAllOrders;
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield OrderModel_1.default.findById(req.params.orderId);
    if (!order) {
        throw new errors_1.NotFoundError(`No order with id : ${req.params.orderId}`);
    }
    (0, utilities_1.checkAuthOrAdmin)(req.user, order.user);
    res.status(http_status_codes_1.StatusCodes.OK).json({ order });
});
exports.getSingleOrder = getSingleOrder;
const getCurrentUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield OrderModel_1.default.find({ user: req.user._id });
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: orders.length, orders });
});
exports.getCurrentUserOrders = getCurrentUserOrders;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield OrderModel_1.default.findById(req.params.orderId);
    if (!order) {
        throw new errors_1.NotFoundError(`No order found`);
    }
    (0, utilities_1.checkAuthOrAdmin)(req.user, order.user);
    order.paymentIntentId = req.body.paymentIntent;
    order.status = "paid";
    res.status(http_status_codes_1.StatusCodes.OK).json({ order });
});
exports.updateOrder = updateOrder;
