"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.static("./public"));
app.use(express_1.default.json());
app.use(middlewares_1.notFound);
app.use(middlewares_1.customErrorHandler);
exports.default = app;
