"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllers_1 = require("../controllers/userControllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(middlewares_1.authenticateUser, (0, middlewares_1.authenticateRoles)("admin"), middlewares_1.authenticateAdmin, userControllers_1.getAllUsers);
router.route("/show-user").get(middlewares_1.authenticateUser, userControllers_1.showCurrentUser);
router.route("/update-user").patch(middlewares_1.authenticateUser, userControllers_1.patchUser);
router.route("/update-password").put(middlewares_1.authenticateUser, userControllers_1.updateUserPassword);
router.route("/:userId").get(middlewares_1.authenticateUser, userControllers_1.getSingleUser);
exports.default = router;
