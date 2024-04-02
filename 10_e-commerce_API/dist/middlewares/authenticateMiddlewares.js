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
exports.authenticateAdmin = exports.authenticateRoles = exports.authenticateUser = void 0;
const errors_1 = require("../errors");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const unauthorized_error_1 = __importDefault(require("../errors/unauthorized-error "));
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticateUser = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const access_token = req.signedCookies.access_token;
    if (!access_token || !access_token.startsWith("Bearer")) {
        throw new errors_1.UnauthenticatedError("Request Denied !");
    }
    try {
        const token = access_token.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        const user = yield UserModel_1.default.findById(payload.userId).select("-password");
        if (user) {
            const isTestUser = user._id.equals(process.env.TEST_USER_ID);
            const isAdmin = user.role === "admin";
            req.user = Object.assign(Object.assign({}, user), { isTestUser, isAdmin });
        }
        next();
    }
    catch (error) {
        throw new errors_1.UnauthenticatedError("Request Denied !");
    }
});
exports.authenticateUser = authenticateUser;
const authenticateRoles = (...roles) => {
    return function (req, _res, next) {
        if (!roles.includes(req.user.role)) {
            throw new unauthorized_error_1.default(`Request denied for ${req.user.role} role`);
        }
        next();
    };
};
exports.authenticateRoles = authenticateRoles;
const authenticateAdmin = (req, _res, next) => {
    if (!req.user.isAdmin) {
        throw new unauthorized_error_1.default("Again Request Denied! Admin Access Only");
    }
    next();
};
exports.authenticateAdmin = authenticateAdmin;
