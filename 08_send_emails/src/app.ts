import express from "express";
import "express-async-errors";
import { notFound, errorHandler } from "./middlewares";
import { sendEmail, sendEmailRealAccount } from "./controllers/sendEmail";

const app = express();

// error handler

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send(`
 <h1>Email Project </h1> 
 <h2><a href="/send">send email using ethereal</a></h2>
 <h2><a href="/send_real_email">send real email</a></h2>
 `);
});

app.get("/send", sendEmail);
app.get("/send_real_email", sendEmail);

app.use(notFound);
app.use(errorHandler);

export default app;
