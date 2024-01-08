import express, { Request, Response, NextFunction, } from "express";

const app = express();

console.log("app = ", app);

app.get("/", (req: Request, res: Response) => {
  console.log("user on Home Page");
  res.status(200).send("Home Page");
});

app.get("/about", (req: Request, res: Response) => {
  res.status(200).send("About Page");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("<h1>resource not found :(</h1>");
});

app.listen(5000, () => {
  console.log(`server is listening on http://localhost:5000`);
});

// app.get
// app.post
// app.put
// app.delete
// app.all : for any Verb
// app.use : for middlewares
// app.listen
