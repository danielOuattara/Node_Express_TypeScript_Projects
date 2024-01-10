"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasksControllers_1 = require("./../controllers/tasksControllers");
const router = express_1.default.Router();
router.route("/").get(tasksControllers_1.getAllTasks).post(tasksControllers_1.createTask);
router.route("/:id").get(tasksControllers_1.getTask).get(tasksControllers_1.getOneTask).patch(tasksControllers_1.patchTask).delete(tasksControllers_1.deleteTask);
exports.default = router;
