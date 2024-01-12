import { Request, Response } from "express";
import Task from "./../models/tasksModel";
import { asyncWrapper } from "./../middlewares";

//-----------------------------------------------------------
const getAllTasks = asyncWrapper(async (_req: Request, res: Response) => {
  const tasks = await Task.find({}).sort({ createdAt: 1 });
  res.status(200).send({ tasks });
});

//-----------------------------------------------------------
const createTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.create(req.body);
  res.status(201).send({ task });
});

//-----------------------------------------------------------
const getTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findOne({ _id: req.params.id });
  if (!task) {
    return res.status(404).json("Task Not Found !");
  }
  return res.status(200).json({ task });
});

// --- OR
//
const getOneTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json("Task Not Found !");
  }
  return res.status(200).json({ task });
});

//-----------------------------------------------------------
const updateTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return res.status(404).json("Task Not Found !");
  }
  return res.status(200).json({ task });
});

//--- OR

const updateOneTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return res.status(404).json("Task Not Found !");
  }
  return res.status(200).json({ task });
});

//------------------------------------------------------------
const patchTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return res.status(404).json("Task Not Found !");
  }
  return res.status(200).json({ task });
});

//--- OR

const patchOneTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true,
    new: true,
  });
  if (!task) {
    return res.status(404).json("Task Not Found !");
  }
  return res.status(200).json({ task });
});

//-----------------------------------------------------------
const deleteTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });
  if (!task) {
    return res.status(404).json("Task Not Found !");
  }
  const tasks = await Task.find({}).sort({ createdAt: 1 });
  res.status(200).send({ tasks });
});

//--- OR

const deleteOneTask = asyncWrapper(async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json("Task Not Found !");
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
