"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", function (_req, res) {
    res.send("Welcome to Jobs API !");
});
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/jobs", jobRoutes_1.default);
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
