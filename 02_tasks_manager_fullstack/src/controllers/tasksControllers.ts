import { Request, Response } from "express";
import Task from "../models/tasksModel";

//-----------------------------------------------------------
const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: 1 });
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};      

//-----------------------------------------------------------
const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//-----------------------------------------------------------
const getTask = async(req: Request, res: Response) => {
    try {
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res.status(404).json("Task Not Found !");
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({error});
  }
};

// --- OR
//
const getOneTask = async (req:Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json("Task Not Found !");
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(404).json({error});
  }
};

//-----------------------------------------------------------
const patchTask = (_req: Request, res: Response) => {
  res.send("patchTask");
};

//-----------------------------------------------------------
const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res.status(404).json("Task Not Found !");
    }
    const tasks = await Task.find({}).sort({ createdAt: 1 });
    res.status(200).send({ tasks });
  } catch (error) {
    return res.status(500).json({error});
  }
};

// -----

const deleteOneTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json("Task Not Found !");
    }
    return res.status(200).send(`task ${req.params.id} successfully deleted !`);
  } catch (error) {
    return res.status(500).json({error});
  }
};

export { getAllTasks, createTask, getTask, getOneTask, patchTask, deleteTask, deleteOneTask };
