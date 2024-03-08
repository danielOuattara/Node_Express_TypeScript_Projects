"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required. Please provide a name"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required. Please provide a valid email"],
        unique: true,
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: "Email is required. Please provide a valid email",
        },
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});
const User = (0, mongoose_1.model)("User", schema);
exports.default = User;
