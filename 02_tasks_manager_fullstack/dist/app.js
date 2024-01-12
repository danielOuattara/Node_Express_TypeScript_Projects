"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasksRoutes_1 = __importDefault(require("./routes/tasksRoutes"));
const not_found_1 = require("./middleware/not-found");
const app = (0, express_1.default)();
app.use(express_1.default.static("./public"));
app.use(express_1.default.json());
app.use("/api/v1/tasks", tasksRoutes_1.default);
app.use(not_found_1.notFound);
exports.default = app;
