"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.patchTask = exports.getOneTask = exports.getTask = exports.createTask = exports.getAllTasks = void 0;
const getAllTasks = (_req, res) => {
    res.send("All tasks");
};
exports.getAllTasks = getAllTasks;
const createTask = (_req, res) => {
    res.send("create task");
};
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
