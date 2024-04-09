"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderControllers_1 = require("../controllers/orderControllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(middlewares_1.authenticateUser, orderControllers_1.createOrder)
    .get(middlewares_1.authenticateUser, (0, middlewares_1.authenticateRoles)("admin"), middlewares_1.authenticateAdmin, orderControllers_1.getAllOrders);
router.route("/showAllMyOrders").get(middlewares_1.authenticateUser, orderControllers_1.getCurrentUserOrders);
router
    .route("/:orderId")
    .get(middlewares_1.authenticateUser, orderControllers_1.getSingleOrder)
    .patch(middlewares_1.authenticateUser, orderControllers_1.updateOrder);
exports.default = router;
