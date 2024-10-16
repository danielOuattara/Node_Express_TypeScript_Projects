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
exports.updateUserPassword = exports.updateUser = exports.showCurrentUser = exports.getSingleUser = exports.getAllUsers = void 0;
const UserModel_1 = __importDefault(require("./../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const utilities_1 = require("../utilities");
const mongoose_1 = require("mongoose");
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.find({ role: "user" }, "-password");
    return res.status(http_status_codes_1.StatusCodes.OK).json({ nb_Hits: users.length, users });
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new errors_1.UnauthenticatedError("Access denied");
    }
    (0, utilities_1.checkAuthOrAdmin)(req.user, new mongoose_1.Types.ObjectId(req.params.userId));
    res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
});
exports.getSingleUser = getSingleUser;
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        user: { name: req.user.name, userId: req.user._id, role: req.user.role },
    });
});
exports.showCurrentUser = showCurrentUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name || !req.body.email) {
        throw new errors_1.BadRequestError("Name and Email are required !");
    }
    const user = yield UserModel_1.default.findById(req.user._id);
    if (!user) {
        throw new errors_1.UnauthenticatedError("User unknown");
    }
    yield user.updateOne(req.body, { new: true, runValidators: true });
    user.attachCookiesToResponse({ res });
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User updated successfully" });
});
exports.updateUser = updateUser;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.oldPassword || !req.body.newPassword) {
        throw new errors_1.BadRequestError("newPassword and oldPassword are required !");
    }
    const user = yield UserModel_1.default.findById(req.user._id);
    if (!user) {
        throw new errors_1.NotFoundError("Email and Password are required !");
    }
    const isValidPassword = yield user.verifyPassword(req.body.oldPassword);
    if (!isValidPassword) {
        throw new errors_1.UnauthenticatedError("User unknown");
    }
    user.password = req.body.newPassword;
    user.save();
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Password successfully updated" });
});
exports.updateUserPassword = updateUserPassword;
