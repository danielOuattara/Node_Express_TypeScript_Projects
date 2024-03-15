import express from "express";
import "express-async-errors";
import { errorHandler, notFound } from "./middlewares";
import morgan from "morgan";
import { createWriteStream } from "node:fs";
import { join } from "node:path";
import authRouter from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors());
// --------------------------------------------- logger
// create a write stream (in append mode)
const accessLogStream = createWriteStream(join(__dirname, "access.log"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

//----------------------------------------------------
//cookies parsing
// app.use(cookieParser()); // <-- Unsigned cookie
app.use(cookieParser(process.env.JWT_SECRET as string)); // <-- Signed cookie
app.use(express.json());

app.use(express.static("./testing-with-frontends/vanilla-frontend"));

app.use("/api/v1/auth", authRouter);

app.use("/api/v1", (req, res) => {
  // console.log("req.cookies = ", req.cookies); // <-- accessing unsigned cookies
  console.log("Welcome to e-commerce API");
  console.log("req.signedCookies = ", req.signedCookies); // <-- accessing signed cookies
  res.send("Welcome to e-commerce API");
});
//errors
app.use(notFound);
app.use(errorHandler);

export default app;
