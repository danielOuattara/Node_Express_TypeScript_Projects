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
const jwt_1 = require("../utilities/auth/jwt");
const authenticateUser = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken, refreshToken } = req.signedCookies;
    try {
        if (accessToken) {
            const accessTokenPayload = (0, jwt_1.isTokenValid)(accessToken);
            const user = yield UserModel_1.default.findById(accessTokenPayload.userId).select("-password");
            if (!user) {
                throw new errors_1.UnauthenticatedError("User unknown");
            }
            const isTestUser = user._id.equals(process.env.TEST_USER_ID);
            const isAdmin = user.role === "admin";
            req.user = Object.assign(Object.assign({}, user.toObject({})), { isTestUser, isAdmin });
            return next();
        }
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
