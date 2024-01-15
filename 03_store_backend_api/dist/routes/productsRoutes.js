"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productControllers_1 = require("./../controllers/productControllers");
const router = (0, express_1.Router)();
router.route("/static").get(productControllers_1.getAllProductsStatic);
router.route("/").get(productControllers_1.getAllProducts);
exports.default = router;
