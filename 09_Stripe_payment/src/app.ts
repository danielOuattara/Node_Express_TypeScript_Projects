import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";
import { stripeController } from "./controllers/stripeController";

const app = express();

app.use(express.json());
app.use(express.static("./dist/public"));

// stripe
app.post("/stripe", stripeController);
app.use(notFound);
app.use(errorHandler);

export default app;
