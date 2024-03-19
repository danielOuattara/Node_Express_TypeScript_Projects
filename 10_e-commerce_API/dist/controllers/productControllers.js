"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAllProducts = exports.createProduct = void 0;
const createProduct = (_req, res) => {
    res.send("createProduct route");
};
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
