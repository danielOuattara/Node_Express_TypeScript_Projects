"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const path_1 = __importDefault(require("path"));
const express_rate_limit_1 = require("express-rate-limit");
const jobsLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 5 * 60 * 1000,
    max: 10,
    limit: 5,
    message: { code: 429, msg: "Too many connection; Try later in 7 mins !" },
});
const app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../..", "./frontend/build")));
app.disable("x-powered-by");
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/jobs", middlewares_1.auth, jobsLimiter, jobRoutes_1.default);
app.get("*", (_req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "../..", "./frontend/build", "index.html"));
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
