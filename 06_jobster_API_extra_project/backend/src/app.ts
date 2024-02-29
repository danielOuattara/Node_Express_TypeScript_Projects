import helmet from "helmet";
import express from "express";
import "express-async-errors";
import { notFound, errorHandler, auth } from "./middlewares";
import authRouter from "./routes/authRoutes";
import jobsRouter from "./routes/jobRoutes";
import path from "path";
import { rateLimit } from "express-rate-limit";

const jobsLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  limit: 5,
  message: { code: 429, msg: "Too many connection; Try later in 7 mins !" },
});

const app = express();

app.set("trust proxy", 1);
app.use(express.static(path.resolve(__dirname, "../..", "./frontend/build")));
app.disable("x-powered-by");
app.use(helmet());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsLimiter, jobsRouter);

// serve frontend index.html
app.get("*", (_req, res) => {
  res.sendFile(
    path.resolve(__dirname, "../..", "./frontend/build", "index.html"),
  );
});

app.use(notFound);
app.use(errorHandler);

export default app;
