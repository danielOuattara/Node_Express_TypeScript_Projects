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
    res.status(http_status_codes_1.StatusCodes.OK).json({ nb_Hits: users.length, users });
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.findOne({ _id: req.params.userId }).select("-password");
    if (!user) {
        throw new errors_1.NotFoundError(`User Not Found with id ${req.params.userId}`);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ user });
});
exports.getSingleUser = getSingleUser;
const showCurrentUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("showCurrentUser");
});
exports.showCurrentUser = showCurrentUser;
const updateUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updateUser");
});
exports.updateUser = updateUser;
const updateUserPassword = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("updateUserPassword");
});
exports.updateUserPassword = updateUserPassword;
