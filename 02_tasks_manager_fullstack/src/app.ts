import express from "express";
import taskRouter from "./routes/tasksRoutes";
import { notFound, customErrorHandler } from "./middlewares";

import { rateLimit } from "express-rate-limit";

const jobsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  limit: 5,
  message: { code: 429, msg: "Too many connection; Try later in 7 mins !" },
});

const app = express();

// app.get("/", (_req: Request, res: Response) => {
//   return res.status(200).send("Welcome !");
// });

app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1/tasks", jobsLimiter, taskRouter);

app.use(notFound);
app.use(customErrorHandler);

export default app;
