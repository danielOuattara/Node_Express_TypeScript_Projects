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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
var ROLE;
(function (ROLE) {
    ROLE["admin"] = "admin";
    ROLE["user"] = "user";
})(ROLE || (ROLE = {}));
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
        enum: ROLE,
        default: ROLE.user,
    },
});
schema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified("password")) {
            const salt = yield bcryptjs_1.default.genSalt(11);
            this.password = yield bcryptjs_1.default.hash(this.password, salt);
        }
        else {
            return;
        }
    });
});
schema.methods.comparePassword = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = yield bcryptjs_1.default.compare(password, this.password);
        return isValid;
    });
};
const User = (0, mongoose_1.model)("User", schema);
exports.default = User;
