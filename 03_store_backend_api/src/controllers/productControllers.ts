import { RequestHandler } from "express";
import Product from "../models/productModel";

//-------------------------------------------------------------------------
// const getAllProductsStatic: RequestHandler = async (_req, res) => {
//   throw new Error("testing error for express-async-errors");
//   res.status(200).json("product testing route");
// };

//-------------------------------------------------------------------------
// const getAllProductsStatic: RequestHandler = async (_req, res) => {
//   const products = await Product.find({});
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
// const getAllProductsStatic: RequestHandler = async (_req, res) => {
//   const products = await Product.find({ featured: true });
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
const getAllProductsStatic: RequestHandler = async (_req, res) => {
  const products = await Product.find({ featured: true, name: "vase table" });
  res.status(200).json({ numberOfHits: products.length, products });
};

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (_req, _res) => {
//   throw new Error("Testing express-async-error");
// };

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (_req, res) => {
//   res.status(200).json({ message: "products route" });
// };

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (req, res) => {
//   console.log(req.query);
//   const products = await Product.find(req.query);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (req, res) => {
/*--> http://localhost:5000/api/v1/products?featured=true&page=2 */
//   console.log("req.query = ", req.query);
//  /* "page" does not exist in the model */
//   const products = await Product.find(req.query);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//-------------------------------------------------------------------------
// interface QueryParams {
//   featured?: string;
//   company?: string;
//   // Add more properties as needed
// }

// interface IQueryObject {
//   [k: string]: string | number | boolean
// }

// const getAllProducts: RequestHandler = async (req, res) => {
//   // console.log("req.query = ", req.query);
//   // const products = await Product.find(req.query);
//   /*------------------------------------------------*/
// /*--> http://localhost:5000/api/v1/products?featured=true */
//   const { featured } = req.query  as QueryParams;
//   const queryObject: IQueryObject = {}; // test for query item first !

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }
//   console.log("queryObject = ", queryObject);

//   const products = await Product.find(queryObject);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

// //----------------------------------------------------------------------------------------------
// interface QueryParams {
//   featured?: string;
//   company?: string;
//   // Add more properties as needed
// }

// interface IQueryObject {
//   [k: string]: string | number | boolean
// }

// const getAllProducts: RequestHandler = async (req, res) => {
//   //http://localhost:5000/api/v1/products?featured=false&company=ikea
//   console.log("req.query = ", req.query);
//   const { featured, company } = req.query as QueryParams ;
//   const queryObject: IQueryObject = {}

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }
//   if (company) {
//     queryObject.company = company;
//   }

//   console.log("queryObject = ", queryObject);
//   const products = await Product.find(queryObject);
//   res.status(200).json({
//     numberOfHits: products.length,
//     products,
//   });
// };

// //----------------------------------------------------------------------------------------------
// interface QueryParams {
//   featured?: string;
//   company?: string;
//   name?: string
// }

// interface IQueryObject {
//   [k: string]: string | number | boolean | RegExp | { $regex: string, $options: string };
// }

// const getAllProducts: RequestHandler = async (req, res) => {
//   //http://localhost:5000/api/v1/products?featured=false&company=ikea&name=albany
//   console.log("req.query = ", req.query);
//   const { featured, company, name } = req.query as QueryParams;
//   const queryObject: IQueryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     // queryObject.name = name; //--> looking for exact name
//     //queryObject.name = new RegExp('^' + name, 'i'); // --> starting with name property in the property
//     //queryObject.name = new RegExp(name + '$', 'i'); // --> ending with name property in the property
//     //queryObject.name = new RegExp('%' + name + '%', 'i'); // --> ending with name property in the property
//     queryObject.name = new RegExp(name, 'i'); // contains name value
//     // queryObject.name = { $regex: name, $options: "i" }; // contains name value // impossible $regex type in Typescript ???
//   }

//   console.log("queryObject = ", queryObject);
//   const products = await Product.find(queryObject);
//   res.status(200).json({
//     numberOfHits: products.length,
//     products,
//   });
// };

//----------------------------------------------------------------------------------------------
// const getAllProducts: RequestHandler = async (req, res) => {
//   console.log(req.query);
//   // const products = await Product.find(req.query);
//   // const products = await Product.find({}).sort("name");
//     // const products = await Product.find({}).sort('-name');
//   const products = await Product.find({}).sort("-name -price"); // ...etc

//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
/* SORT
---------- */

// interface QueryParams {
//   featured?: string;
//   company?: string;
//   name?: string;
//   sort?: string;
// }

// interface IQueryObject {
//   [k: string]:
//     | string
//     | number
//     | boolean
//     | RegExp
//     | { $regex: string; $options: string };
// }

// const getAllProducts: RequestHandler = async (req, res) => {
//   //http://localhost:5000/api/v1/products?featured=false&company=ikea&name=albany
//   console.log("req.query = ", req.query);
//   const { featured, company, name, sort } = req.query as QueryParams;
//   const queryObject: IQueryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = new RegExp(name, "i"); // contains name value
//     // queryObject.name = { $regex: name, $options: "i" }; // contains name value // impossible $regex type in Typescript ???
//   }

//   let sortList: null | string = null;
//   if (sort) {
//     console.log("sort =",  sort);
//     sortList = sort.replace(/,/gi, " ");
//     console.log("sortList = ",typeof sortList);
//   }

//   console.log("queryObject = ", queryObject);
//   const products = await Product.find(queryObject).sort(sortList);
//   res.status(200).json({
//     numberOfHits: products.length,
//     products,
//   });
// };

//-------- OR

// interface QueryParams {
//   featured?: string;
//   company?: string;
//   name?: string;
//   sort?: string;
// }

// interface IQueryObject {
//   [k: string]:
//     | string
//     | number
//     | boolean
//     | RegExp
//     | { $regex: string; $options: string };
// }

// const getAllProducts: RequestHandler = async (req, res) => {
//   //http://localhost:5000/api/v1/products?featured=false&company=ikea&name=albany
//   console.log("req.query = ", req.query);
//   const { featured, company, name, sort } = req.query as QueryParams;
//   const queryObject: IQueryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = new RegExp(name, "i"); // contains name value
//     // queryObject.name = { $regex: name, $options: "i" }; // contains name value // impossible $regex type in Typescript ???
//   }

//   let result = Product.find(queryObject);

//   if (sort) {
//     const sortList = sort.replace(/,/gi, " ");
//     result = result.sort(sortList);
//   }
//   const products = await result;
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//----------------------------------------------------------------------------------------------
/* SELECT & LIMIT 
-------------------*/

// const getAllProducts: RequestHandler = async (_req, res) => {
//   const products = await Product.find({}).select("name price").limit(9);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//---------

// const getAllProducts: RequestHandler = async (_req, res) => {
//   const products = await Product.find({}).select("name price").limit(null);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//---------

// const getAllProducts: RequestHandler = async (_req, res) => {
//   const products = await Product.find({}).select(null).limit(null);
//   res.status(200).json({ numberOfHits: products.length, products });
// };

//---------

// interface QueryParams {
//   featured?: string;
//   company?: string;
//   name?: string;
//   sort?: string;
//   select?: string
// }

// interface IQueryObject {
//   [k: string]:
//     | string
//     | number
//     | boolean
//     | RegExp
//     | { $regex: string; $options: string };
// }

// const getAllProducts: RequestHandler = async (req, res) => {
//   //http://localhost:5000/api/v1/products?featured=false&company=ikea&name=albany
//   console.log("req.query = ", req.query);
//   const { featured, company, name, sort, select } = req.query as QueryParams;
//   const queryObject: IQueryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = new RegExp(name, "i"); // contains name value
//     // queryObject.name = { $regex: name, $options: "i" }; // contains name value // impossible $regex type in Typescript ???
//   }

//   let sortList: null | string = null;
//   if (sort) {
//     console.log("sort =",  sort);
//     sortList = sort.replace(/,/gi, " ");
//     console.log("sortList = ",typeof sortList);
//   }

//     let selectList="";
//   if (select) {
//     console.log("select = ", select);
//     selectList = select.replace(/,/gi, " ");
//     console.log("selectList = ", selectList);
//   }

//   console.log("queryObject = ", queryObject);
//   const products = await Product.find(queryObject).sort(sortList).select(selectList);;
//   res.status(200).json({
//     numberOfHits: products.length,
//     products,
//   });
// };

//-------- OR

// interface QueryParams {
//   featured?: string;
//   company?: string;
//   name?: string;
//   sort?: string | null;
//   select?: string;
// }

// interface IQueryObject {
//   [k: string]:
//     | string
//     | number
//     | boolean
//     | RegExp
//     | { $regex: string; $options: string };
// }

// const getAllProducts: RequestHandler = async (req, res) => {
//   //http://localhost:5000/api/v1/products?featured=false&company=ikea&name=albany
//   console.log("req.query = ", req.query);
//   const { featured, company, name, sort, select } = req.query as QueryParams;
//   const queryObject: IQueryObject = {};

//   if (featured) {
//     queryObject.featured = featured === "true" ? true : false;
//   }

//   if (company) {
//     queryObject.company = company;
//   }

//   if (name) {
//     queryObject.name = new RegExp(name, "i"); // contains name value
//     // queryObject.name = { $regex: name, $options: "i" }; // contains name value // impossible $regex type in Typescript ???
//   }

//   let result = Product.find(queryObject);

//   if (sort) {
//     const sortList = sort.replace(/,/gi, " ");
//     result = result.sort(sortList);
//   }

//   if (select) {
//     console.log(select);
//     const fieldsList: string = select.replace(/,/gi, " ");
//     console.log(fieldsList);
//     result = result.select(fieldsList);
//   }

//   const products = await result;
//   res.status(200).json({ numberOfHits: products.length, products });
// };


//-----------------------------------------------------------------------------

/* SKIP to SETUP PAGE NUMBER 
------------------------------*/

const getAllProducts: RequestHandler = async (_req, res) => {
  const products = await Product.find({})
    .sort("name")
    .select("name -_id")
    .limit(6)
    .skip(10);
  res.status(200).json({ numberOfHits: products.length, products });
};


export { getAllProducts, getAllProductsStatic };
