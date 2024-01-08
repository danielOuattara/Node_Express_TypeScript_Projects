"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("./logger");
const authorize_1 = require("./authorize");
const app = (0, express_1.default)();
//  req => middleware => res
/*logger middleware active for every routes
---------------------------------------------*/
// app.use(logger); /* single middleware */
// app.use([logger, authorize]); /* multiple middlewares */
/* logger middleware active for '/api' route and any other route inside '/api
-------------------------------------------------------------------------------*/
// app.use("/api", logger);
app.use("/api", [logger_1.logger, authorize_1.authorize]);
// api/home/about/products
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
app.get("/api/items", (req, res) => {
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
