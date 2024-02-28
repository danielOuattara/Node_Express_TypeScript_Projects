"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var EnumStatus;
(function (EnumStatus) {
    EnumStatus["INTERVIEW"] = "interview";
    EnumStatus["DECLINED"] = "declined";
    EnumStatus["PENDING"] = "pending";
})(EnumStatus || (EnumStatus = {}));
var EnumJobType;
(function (EnumJobType) {
    EnumJobType["FULL_TIME"] = "full-time";
    EnumJobType["PART_TIME"] = "part-time";
    EnumJobType["REMOTE"] = "remote";
    EnumJobType["INTERNSHIP"] = "internship";
})(EnumJobType || (EnumJobType = {}));
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
        enum: Object.values(EnumStatus),
        default: EnumStatus.PENDING,
    },
    jobType: {
        type: String,
        enum: Object.values(EnumJobType),
        default: EnumJobType.FULL_TIME,
    },
    jobLocation: {
        type: String,
        default: "my city",
        required: [true, "Job location  is required !"],
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Job creator name is required !"],
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Job", schema);
