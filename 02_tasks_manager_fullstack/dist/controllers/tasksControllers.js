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
exports.deleteOneTask = exports.deleteTask = exports.patchOneTask = exports.patchTask = exports.updateOneTask = exports.updateTask = exports.getOneTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const tasksModel_1 = __importDefault(require("./../models/tasksModel"));
const middlewares_1 = require("./../middlewares");
const customError_1 = require("../errors/customError");
const getAllTasks = (0, middlewares_1.asyncWrapper)((_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield tasksModel_1.default.find({}).sort({ createdAt: 1 });
    res.status(200).send({ tasks });
}));
exports.getAllTasks = getAllTasks;
const createTask = (0, middlewares_1.asyncWrapper)((req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.create(req.body);
    res.status(201).send({ task });
}));
exports.createTask = createTask;
const getTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findOne({ _id: req.params.id });
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    return res.status(200).json({ task });
}));
exports.getTask = getTask;
const getOneTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findById(req.params.id);
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    return res.status(200).json({ task });
}));
exports.getOneTask = getOneTask;
const updateTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    return res.status(200).json({ task });
}));
exports.updateTask = updateTask;
const updateOneTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
        new: true,
    });
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    return res.status(200).json({ task });
}));
exports.updateOneTask = updateOneTask;
const patchTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
    });
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    return res.status(200).json({ task });
}));
exports.patchTask = patchTask;
const patchOneTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findOneAndUpdate({ _id: req.params.id }, req.body, {
        runValidators: true,
        new: true,
    });
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    return res.status(200).json({ task });
}));
exports.patchOneTask = patchOneTask;
const deleteTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findOneAndDelete({ _id: req.params.id });
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    const tasks = yield tasksModel_1.default.find({}).sort({ createdAt: 1 });
    res.status(200).send({ tasks });
}));
exports.deleteTask = deleteTask;
const deleteOneTask = (0, middlewares_1.asyncWrapper)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield tasksModel_1.default.findByIdAndDelete(req.params.id);
    if (!task) {
        return next((0, customError_1.createCustomError)("Task not found", 404));
    }
    return res.status(200).send(`task ${req.params.id} successfully deleted !`);
}));
exports.deleteOneTask = deleteOneTask;
