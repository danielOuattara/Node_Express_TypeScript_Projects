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
exports.deleteOneTask = exports.deleteTask = exports.patchTask = exports.getOneTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const tasksModel_1 = __importDefault(require("../models/tasksModel"));
const getAllTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield tasksModel_1.default.find({}).sort({ createdAt: 1 });
        res.status(200).send({ tasks });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getAllTasks = getAllTasks;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksModel_1.default.create(req.body);
        res.status(201).send({ task });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.createTask = createTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksModel_1.default.findOne({ _id: req.params.id });
        if (!task) {
            return res.status(404).json("Task Not Found !");
        }
        return res.status(200).json(task);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.getTask = getTask;
const getOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksModel_1.default.findById(req.params.id);
        if (!task) {
            return res.status(404).json("Task Not Found !");
        }
        return res.status(200).json({ task });
    }
    catch (error) {
        return res.status(404).json({ error });
    }
});
exports.getOneTask = getOneTask;
const patchTask = (_req, res) => {
    res.send("patchTask");
};
exports.patchTask = patchTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksModel_1.default.findOneAndDelete({ _id: req.params.id });
        if (!task) {
            return res.status(404).json("Task Not Found !");
        }
        const tasks = yield tasksModel_1.default.find({}).sort({ createdAt: 1 });
        res.status(200).send({ tasks });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.deleteTask = deleteTask;
const deleteOneTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield tasksModel_1.default.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json("Task Not Found !");
        }
        return res.status(200).send(`task ${req.params.id} successfully deleted !`);
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
exports.deleteOneTask = deleteOneTask;
