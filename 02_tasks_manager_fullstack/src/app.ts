import express, { Request, Response } from "express";
import taskRouter from './routes/tasksRoutes'
const app = express();

app.get("/", (_req: Request, res: Response) => {
	return res.status(200).send("Welcome !")
})

app.use(express.json())


app.use("/api/v1/tasks", taskRouter)

export default app;