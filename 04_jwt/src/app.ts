import "express-async-errors";
import express from "express";
import { notFound, customErrorHandler } from "./middlewares";

const app = express();

// middleware
app.use(express.static("./public"));
app.use(express.json());

app.use(notFound);
app.use(customErrorHandler);

export default app;
