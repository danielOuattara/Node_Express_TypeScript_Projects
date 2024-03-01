import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";
import { sendEmail } from "./controllers/sendEmail";

const app = express();

// error handler

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send('<h1>Email Project</h1> <a href="/send">send email </a>');
});

app.get("/send", sendEmail);

app.use(notFound);
app.use(errorHandler);

export default app;
