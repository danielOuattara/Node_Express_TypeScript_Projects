"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.getSingleReview = exports.getAllReviews = exports.createReview = void 0;
const createReview = (_req, res) => {
    res.send("createReview");
};
exports.createReview = createReview;
const getAllReviews = (_req, res) => {
    res.send("getAllReviews");
};
exports.getAllReviews = getAllReviews;
const getSingleReview = (_req, res) => {
    res.send("getSingleReview");
};
exports.getSingleReview = getSingleReview;
const updateReview = (_req, res) => {
    res.send("updateReview");
};
exports.updateReview = updateReview;
const deleteReview = (_req, res) => {
    res.send("deleteReview");
};
exports.deleteReview = deleteReview;
