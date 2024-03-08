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
exports.stripeController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_PRIVATE);
const createCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
        description: "test customer",
    };
    const customer = yield stripe.customers.create(params);
    console.log(customer.id);
});
createCustomer();
const stripeController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { purchase, total_amount, shipping_fee } = req.body;
    const calculateOrderAmount = () => {
        return total_amount + shipping_fee;
    };
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "eur",
    });
    console.log("paymentIntent = ", paymentIntent);
    res.json({ clientSecret: paymentIntent.client_secret });
});
exports.stripeController = stripeController;
