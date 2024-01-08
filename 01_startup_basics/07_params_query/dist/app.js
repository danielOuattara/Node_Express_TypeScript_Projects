"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import path from "node:path";
const data_1 = require("./data");
const app = (0, express_1.default)();
// first route launched
app.get("/", (_req, res) => {
    res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});
// products page
app.get("/api/products", (_req, res) => {
    const newProducts = data_1.products.map((product) => {
        // get all products whithout description
        const { id, name, image } = product;
        return { id, name, image };
    });
    res.json(newProducts);
});
// single Product
app.get("/api/products/:productId", (req, res) => {
    const singleProduct = data_1.products.find((product) => {
        return product.id === parseInt(req.params.productId);
    });
    if (!singleProduct) {
        return res.status(404).send("404: Product Does Not Exist");
    }
    return res.json(singleProduct);
});
// single review page for a single product item
app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
    console.log(req.params); // --> { productID: '12', reviewID: '3' }
    res.send("hello world");
});
// query
app.get("/api/v1/search", (req, res) => {
    // --> /api/v1/search?name=john&country=korea
    console.log(req.query);
    const reqQuery = req.query;
    res.json({ query: reqQuery });
});
// query again
app.get("/api/v1/finder", (req, res) => {
    // --> localhost:5000/api/v1/finder?limit=1&search=a
    const { search, limit } = req.query;
    let sortedProducts = [...data_1.products];
    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }
    if (limit) {
        sortedProducts = sortedProducts.slice(0, parseInt(limit));
    }
    if (sortedProducts.length === 0) {
        // return res.status(200).send('no products matched your search');
        return res.status(200).json({ success: true, data: [] });
    }
    return res.status(200).json(sortedProducts);
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
