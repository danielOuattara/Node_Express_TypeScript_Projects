"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const authorize_1 = require("./authorize");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
//  req => middleware => res
// 1. use VS route
// 2. options - our own / express / 3rd party
// middleware
app.use(express_1.default.static('./public'));
// app.use("/api", logger);
// app.use("/api", [logger, authorize]);
app.use((0, morgan_1.default)("tiny"));
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
app.get("/api/items", [logger_1.logger, authorize_1.authorize], (req, res) => {
    // test for: /api/items?user=daniel
    if (req.user) {
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
