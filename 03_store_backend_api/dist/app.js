"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
app.use(express_1.default.static("./public"));
app.use(express_1.default.json());
app.get("/", (_req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products/">products routes</a>');
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.customErrorHandler);
exports.default = app;
