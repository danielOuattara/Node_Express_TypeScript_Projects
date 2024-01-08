import express, { Request, Response, NextFunction, } from "express";
// import path from "node:path";

const app = express();

/* 
* setup static and middleware: allows to fetch any file in public/
* a static assets: the server doesn't change anything there, it just serves them
*/
app.use(express.static("public"));

/*
// Below is Not Needed: because index.html is in /public and the app will serve it in first place !
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
*/

app.get("/about", (req: Request, res: Response) => {
  res.status(200).send("About Page");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).send("resource not found");
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
