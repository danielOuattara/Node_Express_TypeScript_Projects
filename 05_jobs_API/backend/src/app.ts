import express from "express";
import "express-async-errors";
import { notFound, errorHandler, auth } from "./middlewares";
import authRouter from "./routes/authRoutes";
import jobsRouter from "./routes/jobRoutes";
import helmet from "helmet";
import cors from "cors";
import xss from "xss";
import rateLimiter from "express-rate-limit";

const app = express();

// security packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 1000,
    max: 20,
    message: { code: 429, message: "Too many connection; Try later !" },
  }),
);
app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use(xss());

app.get("/", function (_req, res) {
  res.send("Welcome to Jobs API !");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
