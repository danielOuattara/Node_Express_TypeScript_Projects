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
const getAllUsers = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.find({ role: "user" }, "-password");
    return res.status(http_status_codes_1.StatusCodes.OK).json({ nb_Hits: users.length, users });
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findOne({ _id: req.params.userId }).select("-password");
    if (!user) {
        throw new errors_1.NotFoundError(`User Not Found with id ${req.params.userId}`);
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user });
});
exports.getSingleUser = getSingleUser;
const showCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(http_status_codes_1.StatusCodes.OK).json({ user: req.user });
});
exports.showCurrentUser = showCurrentUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name || !req.body.email) {
        throw new errors_1.BadRequestError("Name and Email are required !");
    }
    const user = yield UserModel_1.default.findById(req.user._id);
    if (!user) {
        throw new errors_1.NotFoundError("User Not Found");
    }
    yield user.updateOne(req.body, { new: true, runValidators: true });
    user.attachCookiesToResponse(res);
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User updated successfully" });
});
exports.updateUser = updateUser;
const updateUserPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!req.body.oldPassword || !req.body.newPassword) {
        throw new errors_1.BadRequestError("newPassword and oldPassword are required !");
    }
    const user = yield UserModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
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
