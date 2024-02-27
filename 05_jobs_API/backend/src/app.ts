// security imports
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

// regular imports
import express from "express";
import "express-async-errors";
import { notFound, errorHandler, auth } from "./middlewares";
import authRouter from "./routes/authRoutes";
import jobsRouter from "./routes/jobRoutes";

// Swagger + YAML imports
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

// security packages
app.set("trust proxy", 1);
app.use(
  rateLimit({
    windowMs: 1000,
    max: 20,
    message: { code: 429, message: "Too many connection; Try later !" },
  }),
);
app.disable("x-powered-by");
app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use(xss());

app.get("/", function (_req, res) {
  res.send(
    "<h1>Welcome to Jobs API !</h1> <p>API documentation is available. <a href='/api/v1/docs'>see docs</a></p>",
  );
});

// const swaggerDocument = YAML.load("./swagger.yaml");
const swaggerDocument = YAML.load("./swagger-render.yaml");
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
