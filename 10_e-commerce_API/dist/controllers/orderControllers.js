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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = exports.createOrder = exports.getCurrentUserOrders = exports.getSingleOrder = exports.getAllOrders = void 0;
const getAllOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getAllOrders route");
});
exports.getAllOrders = getAllOrders;
const getSingleOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getSingleOrder route");
});
exports.getSingleOrder = getSingleOrder;
const getCurrentUserOrders = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("getCurrentUserOrders route");
});
exports.getCurrentUserOrders = getCurrentUserOrders;
const createOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("createOrder route");
});
exports.createOrder = createOrder;
const updateOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updateOrder route");
});
exports.updateOrder = updateOrder;
