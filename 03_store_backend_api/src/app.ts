import express, { Request,  Response } from "express";
import { notFound, customErrorHandler } from "./middlewares";

const app = express();

app.use(express.static("./public"));
app.use(express.json());

// routes
app.get("/", (_req: Request, res:Response) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products/">products routes</a>');
});

app.use(notFound);
app.use(customErrorHandler);
export default app;
