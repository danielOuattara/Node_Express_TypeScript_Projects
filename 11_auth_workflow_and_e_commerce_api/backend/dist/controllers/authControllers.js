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
exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = exports.verifyEmail = exports.register = void 0;
const UserModel_1 = __importDefault(require("./../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_1 = require("../@types/user");
const node_crypto_1 = require("node:crypto");
const utilities_1 = require("../utilities");
const TokenModel_1 = __importDefault(require("./../models/TokenModel"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = (yield UserModel_1.default.countDocuments({})) === 0 ? user_1.ROLE.admin : user_1.ROLE.user;
    const verificationToken = (0, node_crypto_1.randomBytes)(32).toString("hex");
    yield UserModel_1.default.create(Object.assign(Object.assign({}, req.body), { role: req.body.role || role, verificationToken }));
    const origin = `${req.protocol}://${req.get("host")}`;
    yield (0, utilities_1.sendVerificationEmail)({
        name: req.body.name,
        email: req.body.email,
        origin,
        verificationToken,
    });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        msg: "Successful Registered. Please check your email account ",
    });
});
exports.register = register;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findOne({
        email: req.body.email,
        verificationToken: req.body.verificationToken,
    });
    if (!user) {
        throw new errors_1.UnauthenticatedError("User unknown, Verification Failed! ");
    }
    user.emailIsVerified = true;
    user.emailVerificationDate = new Date();
    user.verificationToken = "";
    yield user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Email is verified, you can login now",
    });
});
exports.verifyEmail = verifyEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        throw new errors_1.BadRequestError("Email and Password are required !");
    }
    const user = yield UserModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("User unknown");
    }
    if (!user.emailIsVerified) {
        throw new errors_1.UnauthenticatedError("Please check your email to confirm your registration !");
    }
    const isValidPassword = yield user.verifyPassword(req.body.password);
    if (!isValidPassword) {
        throw new errors_1.UnauthenticatedError("User unknown");
    }
    let refreshToken = "";
    const existingUserToken = yield TokenModel_1.default.findOne({ user: user._id });
    if (existingUserToken && !existingUserToken["isValid"]) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    if (existingUserToken && existingUserToken["isValid"]) {
        user.attachCookiesToResponse({
            res,
            refreshToken: existingUserToken.refreshToken,
        });
        return res
            .status(http_status_codes_1.StatusCodes.OK)
            .json({ user: { name: user.name, userId: user._id, role: user.role } });
    }
    refreshToken = (0, node_crypto_1.randomBytes)(64).toString("hex");
    const userToken = {
        refreshToken,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
        user: user._id,
    };
    yield TokenModel_1.default.create(userToken);
    user.attachCookiesToResponse({
        res,
        refreshToken,
    });
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: "Login successful",
        user: { name: user.name, userId: user._id, role: user.role },
    });
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield TokenModel_1.default.findOneAndDelete({ user: req.user._id });
    res.cookie("accessToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.cookie("refreshToken", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    return res.status(http_status_codes_1.StatusCodes.OK).json({ msg: "user logged out!" });
});
exports.logout = logout;
const forgotPassword = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("forgotPassword route");
});
exports.forgotPassword = forgotPassword;
const resetPassword = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("forgotPassword route");
});
exports.resetPassword = resetPassword;
