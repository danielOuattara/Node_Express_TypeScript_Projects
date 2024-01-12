"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.patchTask = exports.getOneTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const tasksModel_1 = __importDefault(require("../models/tasksModel"));
const getAllTasks = (_req, res) => {
    res.send("All tasks");
};
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksModel_1.default.create(req.body);
        res.status(201).send({ task });
    }
    catch (error) {
        res.status(500).json({ message: "Error, Something went wrong" });
    }
});
exports.createTask = createTask;
const getTask = (_req, res) => {
    res.send("Single Task");
};
exports.getTask = getTask;
const getOneTask = (_req, res) => {
    res.send("getOneTask");
};
exports.getOneTask = getOneTask;
const patchTask = (_req, res) => {
    res.send("patchTask");
};
exports.patchTask = patchTask;
const deleteTask = (_req, res) => {
    res.send("delete task");
};
exports.deleteTask = deleteTask;
