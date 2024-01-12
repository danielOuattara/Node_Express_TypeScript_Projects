import { Request, Response } from "express";
import Task from "../models/tasksModel";

//-----------------------------------------------------------
const getAllTasks = (_req: Request, res: Response) => {
  res.send("All tasks");
};

//-----------------------------------------------------------
const createTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send({ task });
  } catch (error) {
    res.status(500).json({ message: "Error, Something went wrong" });
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
