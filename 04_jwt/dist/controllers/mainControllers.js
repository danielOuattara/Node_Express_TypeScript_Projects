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
exports.dashboard = exports.login = void 0;
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        throw new errors_1.BadRequestError("Please, provide username AND password");
    }
    const token = jsonwebtoken_1.default.sign({ id: new Date().getTime(), username: req.body.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.status(200).json({ msg: "User successfully logged in", token });
});
exports.login = login;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    return res.status(200).json({
        msg: `Hello ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.username}`,
        secret: Math.floor(Math.random() * 101),
    });
});
exports.dashboard = dashboard;
