import express from "express";
import "express-async-errors";
import { errorHandler, notFound } from "./middlewares";
import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";

const app = express();

// --------------------------------------------- logger
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);

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
app.use(express.json());

app.use("/", (_req, res) => {
  res.send("E-commerce API");
});

//errors
app.use(notFound);
app.use(errorHandler);

export default app;
