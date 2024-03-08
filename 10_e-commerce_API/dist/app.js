"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const morgan_1 = __importDefault(require("morgan"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const app = (0, express_1.default)();
const accessLogStream = node_fs_1.default.createWriteStream(node_path_1.default.join(__dirname, "access.log"), { flags: "a" });
app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
app.use(express_1.default.json());
app.use("/", (req, res) => {
    res.send("E-commerce API");
});
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
