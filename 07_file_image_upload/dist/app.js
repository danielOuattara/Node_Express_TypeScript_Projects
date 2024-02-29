"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    res.send("<h1>File Upload Starter</h1>");
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
app.get("/", (_req, res) => {
    res.send("<h1>File Upload Starter</h1>");
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
