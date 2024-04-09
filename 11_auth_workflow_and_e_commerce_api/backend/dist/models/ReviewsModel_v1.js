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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, "Please provide a rating"],
    },
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide a title"],
        maxLength: 100,
    },
    comment: {
        type: String,
        trim: true,
        required: [true, "Please provide a comment"],
        maxLength: [500, "Comment is max 500 characters"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
}, { timestamps: true });
schema.index({ product: 1, user: 1 }, { unique: true });
schema.static("calculateAverageRating", function (productId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const results = yield this.aggregate([
                { $match: { product: productId } },
                {
                    $group: {
                        _id: "$product",
                        averageRating: {
                            $avg: "$rating",
                        },
                        numberOfReviews: {
                            $sum: 1,
                        },
                    },
                },
            ]);
            yield (0, mongoose_1.model)("Product").findOneAndUpdate({ _id: productId }, {
                averageRating: ((_a = results[0]) === null || _a === void 0 ? void 0 : _a.averageRating.toFixed(1)) || 0,
                numberOfReviews: ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.numberOfReviews) || 0,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
});
schema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.constructor.calculateAverageRating(this.product);
    });
});
schema.post("deleteOne", { document: true, query: false }, function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield this.constructor.calculateAverageRating(this.product);
    });
});
const Model_v1 = (0, mongoose_1.model)("Review", schema);
exports.default = Model_v1;
