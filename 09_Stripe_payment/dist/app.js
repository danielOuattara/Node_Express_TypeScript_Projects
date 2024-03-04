"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const middlewares_1 = require("./middlewares");
const stripeController_1 = require("./controllers/stripeController");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("./dist/public"));
app.post("/stripe", stripeController_1.stripeController);
app.use(middlewares_1.notFound);
app.use(middlewares_1.errorHandler);
exports.default = app;
