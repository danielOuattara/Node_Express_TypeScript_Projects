"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reviewControllers_1 = require("../controllers/reviewControllers");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.route("/").post(auth_1.authUser, reviewControllers_1.createReview).get(reviewControllers_1.getAllReviews);
router
    .route("/:reviewId")
    .get(reviewControllers_1.getSingleReview)
    .patch(auth_1.authUser, reviewControllers_1.updateReview)
    .delete(auth_1.authUser, reviewControllers_1.deleteReview);
exports.default = router;
