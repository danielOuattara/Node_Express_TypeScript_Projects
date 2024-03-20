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
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const accessLogStream = (0, node_fs_1.createWriteStream)((0, node_path_1.join)(__dirname, "access.log"), {
    flags: "a",
});
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use(express_1.default.json());
app.use(express_1.default.static("./testing-with-frontends/vanilla-frontend"));
app.use(express_1.default.static("./dist/public"));
app.use((0, express_fileupload_1.default)());
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/reviews", reviewRoutes_1.default);
app.use("/api/v1", (req, res) => {
    console.log("Welcome to e-commerce API");
    console.log("req.signedCookies = ", req.signedCookies);
    res.send("Welcome to e-commerce API");
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
