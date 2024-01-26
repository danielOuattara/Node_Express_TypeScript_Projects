"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required. Please provide a name"],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required. Please provide a name"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minLength: 6,
    },
});
exports.default = (0, mongoose_1.model)("User", UserSchema);
