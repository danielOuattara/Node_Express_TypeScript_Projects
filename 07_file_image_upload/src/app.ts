import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";
import productRouter from "./routes/productRoutes";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

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

export default app;
