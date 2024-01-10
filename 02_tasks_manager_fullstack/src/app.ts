
import express, { Request, Response } from "express";


const app = express();


app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products/">products routes</a>');
});

export default app