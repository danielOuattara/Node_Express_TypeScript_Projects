"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use((0, express_rate_limit_1.rateLimit)({
    windowMs: 1000,
    max: 20,
    message: { code: 429, message: "Too many connection; Try later !" },
}));
app.disable("x-powered-by");
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", function (_req, res) {
    res.send("<h1>Welcome to Jobs API !</h1> <p>API documentation is available. <a href='/api/v1/docs'>see docs</a></p>");
});
const swaggerDocument = yamljs_1.default.load("./swagger-render.yaml");
app.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/jobs", middlewares_1.auth, jobRoutes_1.default);
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
