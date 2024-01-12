import { RequestHandler } from "express";
import Task from "./../models/tasksModel";
import { asyncWrapper } from "./../middlewares";
import { createCustomError } from "../errors/customError";

//-----------------------------------------------------------
const getAllTasks: RequestHandler = asyncWrapper(async (_req, res, _next) => {
  const tasks = await Task.find({}).sort({ createdAt: 1 });
  res.status(200).send({ tasks });
});

//-----------------------------------------------------------
const createTask: RequestHandler = asyncWrapper(async (req, res, _next) => {
  const task = await Task.create(req.body);
  res.status(201).send({ task });
});

//-----------------------------------------------------------
const getTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    /* Manually setting Error here: Not Efficient: prefer a class */
    // const error: Error = new Error("Task Not Found");
    // error.status = 404;
    // return next(error);
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }

  return res.status(200).json({ task });
});

// --- OR
//
const getOneTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }

  return res.status(200).json({ task });
});

//-----------------------------------------------------------
const updateTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }

  return res.status(200).json({ task });
});

//--- OR

const updateOneTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }
  return res.status(200).json({ task });
});

//------------------------------------------------------------
const patchTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }
  return res.status(200).json({ task });
});

//--- OR

const patchOneTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }
  return res.status(200).json({ task });
});

//-----------------------------------------------------------
const deleteTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }
  const tasks = await Task.find({}).sort({ createdAt: 1 });
  res.status(200).send({ tasks });
});

//--- OR

const deleteOneTask: RequestHandler = asyncWrapper(async (req, res, next) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    // return res.status(404).json("Task Not Found !");
    return next(createCustomError("Task not found", 404));
  }
  return res.status(200).send(`task ${req.params.id} successfully deleted !`);
});

//------------------------------------------------------------

export {
  getAllTasks,
  createTask,
  getTask,
  getOneTask,
  updateTask,
  updateOneTask,
  patchTask,
  patchOneTask,
  deleteTask,
  deleteOneTask,
};
