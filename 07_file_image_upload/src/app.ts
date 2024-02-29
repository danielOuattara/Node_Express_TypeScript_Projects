import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";

const app = express();

app.get("/", (_req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use(notFound);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

// middleware
app.use(notFound);
app.use(errorHandler);

export default app;
