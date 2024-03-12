import express from "express";
import "express-async-errors";
import { errorHandler, notFound } from "./middlewares";
import morgan from "morgan";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

// --------------------------------------------- logger
// create a write stream (in append mode)
const accessLogStream = createWriteStream(join(__dirname, "access.log"), {
  flags: "a",
});

// app.use(morgan("tiny"));
// app.use(morgan("combined"));
// app.use(
//   morgan(function (tokens, req, res) {
//     return [
//       tokens.method(req, res),
//       tokens.url(req, res),
//       tokens.status(req, res),
//       tokens.res(req, res, "content-length"),
//       "-",
//       tokens["response-time"](req, res),
//       "ms",
//     ].join(" ");
//   }),
// );

// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms"),
// );

app.use(morgan("combined", { stream: accessLogStream }));

//----------------------------------------------------
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.use("/", (req, res) => {
  console.log(req.cookies);
  res.send("Welcome to e-commerce API");
});
//errors
app.use(notFound);
app.use(errorHandler);

export default app;
