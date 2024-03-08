"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const morgan_1 = __importDefault(require("morgan"));
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
const accessLogStream = (0, node_fs_1.createWriteStream)((0, node_path_1.join)(__dirname, "access.log"), {
    flags: "a",
});
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use(express_1.default.json());
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/", (_req, res) => {
    res.send("Welcome to e-commerce API");
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
