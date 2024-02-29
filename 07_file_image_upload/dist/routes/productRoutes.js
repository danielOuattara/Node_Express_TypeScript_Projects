"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productControllers_1 = require("../controllers/productControllers");
const uploadsControllers_1 = require("../controllers/uploadsControllers");
const router = express_1.default.Router();
router.route("/").post(productControllers_1.createProduct).get(productControllers_1.getAllProducts);
router.route("/uploads").post(uploadsControllers_1.uploadProductImage);
exports.default = router;
