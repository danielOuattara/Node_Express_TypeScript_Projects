import "express-async-errors";
import express, { Request, Response } from "express";
import { notFound, customErrorHandler } from "./middlewares";
import productsRouter from "./routes/productRoutes";

const app = express();

app.use(express.static("./public"));
app.use(express.json());

// routes
app.get("/", (_req: Request, res: Response) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products/">products routes</a>');
});

app.use("/api/v1/products", productsRouter); // product routes

app.use(notFound);
app.use(customErrorHandler);
export default app;
