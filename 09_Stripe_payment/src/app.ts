import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.static("./dist/public"));

// stripe
app.use(notFound);
app.use(errorHandler);

export default app;
