import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";
import authRouter from "./routes/authRoutes";
import jobsRouter from "./routes/jobRoutes";

const app = express();

app.use(express.json());

app.get("/", function (_req, res) {
  res.send("Welcome to Jobs API !");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
