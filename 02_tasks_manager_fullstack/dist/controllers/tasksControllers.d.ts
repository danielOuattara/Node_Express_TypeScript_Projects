import { Request, Response } from "express";
declare const getAllTasks: (_req: Request, res: Response) => void;
declare const createTask: (_req: Request, res: Response) => void;
declare const getTask: (_req: Request, res: Response) => void;
declare const getOneTask: (_req: Request, res: Response) => void;
declare const patchTask: (_req: Request, res: Response) => void;
declare const deleteTask: (_req: Request, res: Response) => void;
export { getAllTasks, createTask, getTask, getOneTask, patchTask, deleteTask };
