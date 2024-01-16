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
const custom_error_1 = __importDefault(require("../errors/custom-error"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        throw new custom_error_1.default("Please, provide username AND password", 400);
    }
    return res.status(200).json({ msg: "Fake Login/register/signup routes" });
});
exports.login = login;
const dashboard = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res
        .status(200)
        .json({
        message: "Hello John Doe",
        numberSecret: Math.floor(Math.random() * 101),
    });
});
exports.dashboard = dashboard;
