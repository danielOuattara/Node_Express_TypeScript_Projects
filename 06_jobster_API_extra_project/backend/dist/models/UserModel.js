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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name is required: please provide a name."],
        trim: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "lastName",
    },
    email: {
        type: String,
        required: [true, "Email is required: please provide an email."],
        match: [emailRegex, "Please provide a valid email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required: please provide password."],
        minlength: 6,
    },
    location: {
        type: String,
        trim: true,
        maxlength: 20,
        default: "my city",
    },
});
schema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcryptjs_1.default.hash(this.password, 13);
    });
});
schema.methods.getName = function () {
    return this.name;
};
schema.methods.createJWT = function () {
    return jsonwebtoken_1.default.sign({ userId: this._id, name: this.name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
schema.methods.comparePassword = function (password) {
    return bcryptjs_1.default.compare(password, this.password);
};
exports.default = (0, mongoose_1.model)("User", schema);
