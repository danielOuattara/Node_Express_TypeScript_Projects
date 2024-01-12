import express from "express";
import taskRouter from "./routes/tasksRoutes";
import { notFound } from "./middlewares/not-found";
const app = express();

// app.get("/", (_req: Request, res: Response) => {
//   return res.status(200).send("Welcome !");
// });

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

app.use(notFound);
export default app;
