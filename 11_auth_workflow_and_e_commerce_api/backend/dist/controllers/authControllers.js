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
const TokenModel_1 = __importDefault(require("./../models/TokenModel"));
const UserModel_1 = __importDefault(require("./../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_1 = require("../@types/user");
const node_crypto_1 = require("node:crypto");
const utilities_1 = require("../utilities");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = (yield UserModel_1.default.countDocuments({})) === 0 ? user_1.ROLE.admin : user_1.ROLE.user;
    const verificationToken = (0, node_crypto_1.randomBytes)(32).toString("hex");
    yield UserModel_1.default.create(Object.assign(Object.assign({}, req.body), { role: req.body.role || role, verificationToken }));
    const origin = req.get("x-forwarded-host");
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
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email) {
        throw new errors_1.BadRequestError("Please provide email");
    }
    const user = yield UserModel_1.default.findOne({ email: req.body.email });
    if (user && user.emailIsVerified && user.verificationToken === "") {
        const passwordToken = (0, node_crypto_1.randomBytes)(128).toString("hex");
        const lengthTime = 1000 * 60 * 5;
        const passwordTokenExpiration = new Date(Date.now() + lengthTime);
        user.passwordToken = (0, utilities_1.createHash)(passwordToken);
        user.passwordTokenExpiration = passwordTokenExpiration;
        const origin = req.get("x-forwarded-host");
        yield (0, utilities_1.sendResetPasswordEmail)({
            name: user.name,
            email: user.email,
            passwordToken,
            origin,
        });
        yield user.save();
    }
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "Please check your email for more instructions" });
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, passwordConfirm, token, email } = req.body;
    if (!password || !passwordConfirm) {
        throw new errors_1.BadRequestError("Please provide both password and confirmation password");
    }
    if (!email || !token) {
        throw new errors_1.BadRequestError("Something went wrong, please try again");
    }
    if (password !== passwordConfirm) {
        throw new errors_1.BadRequestError("Password and confirmation password must be identical,Please try again");
    }
    const user = yield UserModel_1.default.findOne({ email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials");
    }
    if (!user.passwordTokenExpiration ||
        user.passwordTokenExpiration < new Date()) {
        throw new errors_1.BadRequestError("Token expired, please try again");
    }
    if (user.passwordToken !== (0, utilities_1.createHash)(token)) {
        throw new errors_1.UnauthenticatedError("Invalid Credentials, please try again");
    }
    user.password = password;
    user.passwordToken = null;
    user.passwordTokenExpiration = null;
    yield user.save();
    res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ msg: "Password update success, you can login now" });
});
exports.resetPassword = resetPassword;
