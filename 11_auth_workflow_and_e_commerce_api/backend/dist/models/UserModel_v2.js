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
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_1 = require("../@types/user");
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
        enum: {
            values: Object.values(user_1.ROLE),
            default: user_1.ROLE.user,
            message: "{VALUE} is not a valid value for ROLE position",
        },
    },
    verificationToken: {
        type: String,
    },
    isVerified: { type: Boolean, default: false },
    verified: {
        type: Date,
    },
});
schema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return;
        const salt = yield (0, bcryptjs_1.genSalt)(11);
        this.password = yield (0, bcryptjs_1.hash)(this.password, salt);
    });
});
schema.methods.verifyPassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcryptjs_1.compare)(password, this.password);
    });
};
schema.methods.createJWT = function (payload) {
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    });
};
schema.methods.attachCookiesToResponse = function (res) {
    const payload = {
        name: this.name,
        userId: this._id,
        role: this.role,
    };
    const token = this.createJWT(payload);
    return res.cookie("access_token", "Bearer " + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
    });
};
schema.static("destroyCookiesInResponse", function (res) {
    return res.cookie("access_token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
});
const User_v2 = (0, mongoose_1.model)("User", schema);
exports.default = User_v2;
