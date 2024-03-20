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
const errors_1 = require("../errors");
const node_path_1 = __importDefault(require("node:path"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.user = req.user._id;
    const product = yield ProductModel_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ product });
});
exports.createProduct = createProduct;
const getAllProducts = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield ProductModel_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: products.length, products });
});
exports.getAllProducts = getAllProducts;
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findById(req.params.productId);
    if (!product) {
        throw new errors_1.NotFoundError(`No product found with ID: ${req.params.productId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ product });
});
exports.getSingleProduct = getSingleProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true, runValidators: true });
    if (!product) {
        throw new errors_1.NotFoundError("Product not found");
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Product updated successfully", product });
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findById(req.params.productId);
    if (!product) {
        throw new errors_1.NotFoundError("Product not found");
    }
    yield product.deleteOne();
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Product deleted successfully" });
});
exports.deleteProduct = deleteProduct;
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        throw new errors_1.BadRequestError("No File Uploaded");
    }
    const productImage = req.files.image;
    if (Array.isArray(productImage)) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send("Please send one image per request");
    }
    else {
        if (!productImage.mimetype.startsWith("image")) {
            throw new errors_1.BadRequestError("Only image can be uploaded");
        }
        if (productImage.size > parseInt(process.env.IMAGE_MAX_SIZE)) {
            throw new errors_1.BadRequestError("Image max size is 1Mb");
        }
        const imagePath = node_path_1.default.join(__dirname, "./../public/uploads/" + `${productImage.name}`);
        yield productImage.mv(imagePath);
        res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ image: { src: `/uploads/${productImage.name}` } });
    }
});
exports.uploadImage = uploadImage;
