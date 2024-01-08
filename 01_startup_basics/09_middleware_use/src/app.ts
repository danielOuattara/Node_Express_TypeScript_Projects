import express, { Request, Response, NextFunction, RequestHandler } from "express";
import {logger} from "./logger"
import {authorize} from "./authorize";


declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

const app = express();

//  req:Request => middleware => res

/*logger middleware active for every routes 
---------------------------------------------*/
// app.use(logger); /* single middleware */
// app.use([logger, authorize]); /* multiple middlewares */

/* logger middleware active for '/api' route and any other route inside '/api 
-------------------------------------------------------------------------------*/
// app.use("/api", logger);
app.use("/api", [logger, authorize]);

// api/home/about/products
app.get("/", (_req:Request, res:Response) => {
  res.send("Home");
});

app.get("/daniel", (_req:Request, res:Response) => {
  res.send("Welcome Daniel !");
});

app.get("/about", (_req:Request, res:Response) => {
  res.send("About");
});

app.get("/api/products", (_req:Request, res:Response) => {
  res.send("Products");
});

app.get("/api/items", (req:Request, res:Response) => {
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
