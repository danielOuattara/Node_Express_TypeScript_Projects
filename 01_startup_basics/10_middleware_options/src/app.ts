import express, { Request, Response, NextFunction, RequestHandler } from "express";
import {logger} from "./logger"
import {authorize} from "./authorize";
import morgan from "morgan"


declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

const app = express();

//  req => middleware => res

// 1. use VS route
// 2. options - our own / express / 3rd party

// middleware
 app.use(express.static('./public'))

// app.use("/api", logger);
// app.use("/api", [logger, authorize]);

app.use(morgan("tiny"));

app.get("/", (_req, res) => {
  res.send("Home");
});

app.get("/daniel", (_req, res) => {
  res.send("Welcome Daniel !");
});

app.get("/about", (_req, res) => {
  res.send("About");
});

app.get("/api/products", (_req, res) => {
  res.send("Products");
});

app.get("/api/items",[logger, authorize], (req: Request, res: Response) => {
  // test for: /api/items?user=daniel
  if(req.user) {
  console.log(req.user);
}
  res.send("Items");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000....");
});











// app.get
// app.post
// app.put
// app.delete
// app.all : for any Verb
// app.use : for middlewares
// app.listen
