import { Request, Response } from "express";


//-----------------------------------------------------------
const getAllTasks = (_req: Request, res: Response) => {
	res.send("All tasks")
}


//-----------------------------------------------------------
const createTask = (_req: Request, res: Response) => {
	res.send("create task")
}

//-----------------------------------------------------------
const getTask = (_req: Request, res: Response) => {
	res.send("Single Task")
}


//-----------------------------------------------------------
const getOneTask = (_req: Request, res: Response) => {
	res.send("getOneTask")
}

//-----------------------------------------------------------
const patchTask = (_req: Request, res: Response) => {
	res.send("patchTask")
}

//-----------------------------------------------------------
const deleteTask = (_req: Request, res: Response) => {
	res.send("delete task")
}



export { getAllTasks, createTask, getTask, getOneTask, patchTask, deleteTask }