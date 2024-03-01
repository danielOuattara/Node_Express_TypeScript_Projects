import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";
import productRouter from "./routes/productRoutes";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.static("./public")); // static assets
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

app.get("/", (_req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

app.use("/api/v1/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.send("<h1>File Upload Starter</h1>");
});

// middleware
app.use(notFound);
app.use(errorHandler);

export default app;
