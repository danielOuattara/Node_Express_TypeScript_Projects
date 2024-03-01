"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsControllers_1 = require("../controllers/productsControllers");
const uploadsControllers_1 = require("../controllers/uploadsControllers");
const router = express_1.default.Router();
router.route("/").post(productsControllers_1.createProduct).get(productsControllers_1.getAllProducts);
router.route("/uploads").post(uploadsControllers_1.uploadProductImage);
exports.default = router;
