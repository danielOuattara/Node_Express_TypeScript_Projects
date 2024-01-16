import "express-async-errors";
import express from "express";
import { notFound, errorHandler } from "./middlewares";
import mainRouter from "./routes/mainRoutes";
const app = express();

// middlewares
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", mainRouter);
app.use(notFound);
app.use(errorHandler);

export default app;
