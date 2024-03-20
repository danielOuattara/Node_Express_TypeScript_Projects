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
exports.deleteReview = exports.updateReview = exports.getSingleReview = exports.getAllReviews = exports.createReview = void 0;
const ReviewsModel_1 = __importDefault(require("./../models/ReviewsModel"));
const ProductModel_1 = __importDefault(require("./../models/ProductModel"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield ProductModel_1.default.findById(req.body.product);
    if (!product) {
        throw new errors_1.NotFoundError("Product unknown");
    }
    const alreadySubmittedReview = yield ReviewsModel_1.default.findOne({
        product: req.body.product,
        user: req.user._id,
    });
    if (alreadySubmittedReview) {
        throw new errors_1.BadRequestError(`Cannot create a new review on this product. But you can update your old review `);
    }
    req.body.user = req.user._id;
    const review = yield ReviewsModel_1.default.create(req.body);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ message: "review successfully created", review });
});
exports.createReview = createReview;
const getAllReviews = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield ReviewsModel_1.default.find({});
    res.status(http_status_codes_1.StatusCodes.OK).json({ count: reviews.length, reviews });
});
exports.getAllReviews = getAllReviews;
const getSingleReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield ReviewsModel_1.default.findById(req.params.reviewId);
    if (!review) {
        throw new errors_1.BadRequestError(`No product found with ID: ${req.params.reviewId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ review });
});
exports.getSingleReview = getSingleReview;
const updateReview = (_req, res) => {
    res.send("updateReview");
};
exports.updateReview = updateReview;
const deleteReview = (_req, res) => {
    res.send("deleteReview");
};
exports.deleteReview = deleteReview;
