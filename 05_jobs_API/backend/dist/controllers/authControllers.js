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
exports.login = exports.register = void 0;
const UserModel_1 = __importDefault(require("./../models/UserModel"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserModel_1.default.create(req.body);
    const token = yield jsonwebtoken_1.default.sign(req.body, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ user, token });
});
exports.register = register;
const login = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("login user");
});
exports.login = login;
