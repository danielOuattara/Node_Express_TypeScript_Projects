import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";

const app = express();

app.use(express.json());

app.get("/", function (_req, res) {
  res.send("Welcome to Jobs API !");
});

app.use(notFound);
app.use(errorHandler);

export default app;
