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
const getTask = (_req: Request, res: Response) => {
  res.send("Single Task");
};

//-----------------------------------------------------------
const getOneTask = (_req: Request, res: Response) => {
  res.send("getOneTask");
};

//-----------------------------------------------------------
const patchTask = (_req: Request, res: Response) => {
  res.send("patchTask");
};

//-----------------------------------------------------------
const deleteTask = (_req: Request, res: Response) => {
  res.send("delete task");
};

export { getAllTasks, createTask, getTask, getOneTask, patchTask, deleteTask };
