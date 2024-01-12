import { Request, Response } from "express";
declare const getAllTasks: (_req: Request, res: Response) => Promise<void>;
declare const createTask: (req: Request, res: Response) => Promise<void>;
declare const getTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getOneTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const patchTask: (_req: Request, res: Response) => void;
declare const deleteTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
declare const deleteOneTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export { getAllTasks, createTask, getTask, getOneTask, patchTask, deleteTask, deleteOneTask };
