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
exports.getAllProductsStatic = exports.getAllProducts = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const getAllProductsStatic = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find({ featured: true, name: "vase table" });
    res.status(200).json({ numberOfHits: products.length, products });
});
exports.getAllProductsStatic = getAllProductsStatic;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { featured } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }
    console.log("queryObject = ", queryObject);
    const products = yield productModel_1.default.find(queryObject);
    res.status(200).json({ numberOfHits: products.length, products });
});
exports.getAllProducts = getAllProducts;
