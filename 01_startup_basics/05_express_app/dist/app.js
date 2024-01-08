"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import path from "node:path";
const app = (0, express_1.default)();
const data_ts_1 = require("./data.ts");
/*
* setup static and middleware: allows to fetch any file in public/
* a static assets: the server doesn't change anything there, it just serves them
*/
app.use(express_1.default.static("public"));
/*
// Below is Not Needed !
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});
*/
app.get("/about", (req, res) => {
    res.status(200).send("About Page");
});
app.all("*", (req, res) => {
    res.status(404).send("resource not found");
});
app.listen(5000, () => {
    console.log(`server is listening on http://localhost:5000`);
});
app.get("/", (req, res) => {
    res.status(200).json({ products: data_ts_1.products, people: data_ts_1.people });
});
app.listen(5000, () => {
    console.log("Server is listening on port 5000...");
});
// app.get
// app.post
// app.put
// app.delete
// app.all : for any Verb
// app.use : for middlewares
// app.listen
