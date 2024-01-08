import express, { Request, Response, NextFunction, } from "express";
// import path from "node:path";
import { products, people } from "./data";
const app = express();

// first route launched
app.get("/", (_req: Request, res: Response) => {
  res.send('<h1> Home Page</h1><a href="/api/products">products</a>');
});

// products page
app.get("/api/products", (_req: Request, res: Response) => {
  const newProducts = products.map((product: Product) => {
    // get all products whithout description
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

// single Product
app.get("/api/products/:productId", (req: Request, res: Response) => {
  const singleProduct = products.find((product:Product) => {
    return product.id === parseInt(req.params.productId);
  });
  if (!singleProduct) {
    return res.status(404).send("404: Product Does Not Exist");
  }
  return res.json(singleProduct);
});

// single review page for a single product item
app.get("/api/products/:productID/reviews/:reviewID", (req: Request, res: Response) => {
    console.log(req.params); // --> { productID: '12', reviewID: '3' }
    res.send("hello world");
});

// query
app.get("/api/v1/search", (req:Request, res: Response) => {
    // --> /api/v1/search?name=john&country=korea
    console.log(req.query);
    const reqQuery = req.query;
    res.json({ query: reqQuery });
});

// query again
app.get("/api/v1/finder", (req: Request, res: Response) => {

  // --> localhost:5000/api/v1/finder?limit=1&search=a
    const { search, limit } = <{[key: string]: string}>req.query;
    let sortedProducts: Product[] = [...products];

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
