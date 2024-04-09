"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewControllers_1 = require("../controllers/reviewControllers");
const authenticateMiddlewares_1 = require("../middlewares/authenticateMiddlewares");
const router = (0, express_1.Router)();
router.route("/").post(authenticateMiddlewares_1.authenticateUser, reviewControllers_1.createReview).get(reviewControllers_1.getAllReviews);
router
    .route("/:reviewId")
    .get(reviewControllers_1.getSingleReview)
    .patch(authenticateMiddlewares_1.authenticateUser, reviewControllers_1.updateReview)
    .delete(authenticateMiddlewares_1.authenticateUser, reviewControllers_1.deleteReview);
exports.default = router;
