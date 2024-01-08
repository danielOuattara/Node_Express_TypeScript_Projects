"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
//  req => middleware => res
const logger = (req, _res, next) => {
    console.log(req.method, req.url, new Date().getFullYear());
    next();
};
app.get("/", logger, (_req, res) => {
    res.send("Home");
});
app.get("/about", logger, (_req, res) => {
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
