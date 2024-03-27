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
exports.logout = exports.login = exports.register = void 0;
const UserModel_1 = __importDefault(require("./../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const user_1 = require("../@types/user");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = (yield UserModel_1.default.countDocuments({})) === 0 ? user_1.ROLE.admin : user_1.ROLE.user;
    const user = yield UserModel_1.default.create(Object.assign(Object.assign({}, req.body), { role }));
    user.attachCookiesToResponse(res);
    res
        .status(http_status_codes_1.StatusCodes.CREATED)
        .json({ user: { name: user.name, userId: user._id, role: user.role } });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email || !req.body.password) {
        throw new errors_1.BadRequestError("Email and Password are required !");
    }
    const user = yield UserModel_1.default.findOne({ email: req.body.email });
    if (!user) {
        throw new errors_1.UnauthenticatedError("User unknown");
    }
    const isValidPassword = yield user.verifyPassword(req.body.password);
    if (!isValidPassword) {
        throw new errors_1.UnauthenticatedError("User unknown");
    }
    user.attachCookiesToResponse(res);
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Login successful" });
});
exports.login = login;
const logout = (_req, res) => {
    UserModel_1.default.destroyCookiesInResponse(res);
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: "User is logged out" });
};
exports.logout = logout;
