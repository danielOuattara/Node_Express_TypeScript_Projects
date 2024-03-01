"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const sendEmail_1 = require("./controllers/sendEmail");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send('<h1>Email Project</h1> <a href="/send">send email </a>');
});
app.get("/send", sendEmail_1.sendEmail);
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
