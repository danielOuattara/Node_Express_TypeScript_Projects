import "express-async-errors";
import express from "express";
import { notFound, errorHandler } from "./middlewares";

const app = express();

// middlewares
app.use(express.static("./public"));
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

export default app;
