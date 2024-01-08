import express, { RequestHandler, Request, Response } from "express";

const app = express();

//  req => middleware => res

const logger: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.url, new Date().getFullYear());
  next();
};

app.get("/", logger, (_req: Request, res: Response) => {
  res.send("Home");
});

app.get("/about", logger, (_req: Request, res:Response) => {
  res.send("About");
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
