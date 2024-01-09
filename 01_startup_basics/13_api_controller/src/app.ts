import express, { Request, Response } from "express";
import morgan from "morgan";
import peopleRouter from "./routes/peopleRouter";
import authRouter from "./routes/authRouter";

const app = express();

// middleware: output the time for the server to send the response
app.use(morgan("tiny"));

// middleware: serves static assets in /public
app.use(express.static("./public"));

// parse incoming form data
app.use(express.urlencoded({ extended: false }));

// parse incoming json data
app.use(express.json());

// router
app.use("/api/people", peopleRouter);
app.use("/login", authRouter);

app.listen(5000, () => {
  console.log("Server is listening on port http://localhost:5000....");
});
