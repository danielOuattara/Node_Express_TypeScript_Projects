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
const errors_1 = require("./../errors");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name || !req.body.email || !req.body.password) {
        throw new errors_1.BadRequestError("Please provide: name, email, password");
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(req.body.password, salt);
    const tempUSer = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    };
    const user = yield UserModel_1.default.create(tempUSer);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(tempUSer);
});
exports.register = register;
const login = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("login user");
});
exports.login = login;
