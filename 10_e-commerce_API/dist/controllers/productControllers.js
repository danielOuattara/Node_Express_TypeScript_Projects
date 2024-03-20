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
exports.uploadImage = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.createProduct = void 0;
const ProductModel_1 = __importDefault(require("./../models/ProductModel"));
const http_status_codes_1 = require("http-status-codes");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.user = req.user._id;
    const product = yield ProductModel_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ product });
});
exports.createProduct = createProduct;
const getAllProducts = (_req, res) => {
    res.send("getAllProducts route");
};
exports.getAllProducts = getAllProducts;
const getSingleProduct = (_req, res) => {
    res.send("getSingleProduct route");
};
exports.getSingleProduct = getSingleProduct;
const updateProduct = (_req, res) => {
    res.send("updateProduct route");
};
exports.updateProduct = updateProduct;
const deleteProduct = (_req, res) => {
    res.send("deleteProduct route");
};
exports.deleteProduct = deleteProduct;
const uploadImage = (_req, res) => {
    res.send("uploadImage route");
};
exports.uploadImage = uploadImage;
