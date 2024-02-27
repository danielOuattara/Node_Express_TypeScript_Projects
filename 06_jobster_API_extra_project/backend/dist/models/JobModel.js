"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    company: {
        type: String,
        required: [true, "Company name is required !"],
        maxLength: 50,
        trim: true,
    },
    position: {
        type: String,
        required: [true, "Position title is required !"],
        maxLength: 100,
        trim: true,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending",
    },
    createdBy: {
        type: mongodb_1.ObjectId,
        ref: "User",
        required: [true, "Job creator name is required !"],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Job", schema);
