import express from "express";
import "express-async-errors";
import { errorHandler, notFound } from "./middlewares";

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.send("E-commerce API");
});

//errors
app.use(notFound);
app.use(errorHandler);

export default app;
