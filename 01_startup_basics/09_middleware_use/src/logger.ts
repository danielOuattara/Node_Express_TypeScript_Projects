import { RequestHandler } from "express";

export const logger: RequestHandler = (req, _res, next) => {
  console.log(req.method, req.url, new Date().getFullYear());
  next();
};



//-------------------------------------------------------

// exports = (req, res, next): RequestHandler => {
//   const method = req.method;
//   const url = req.url;
//   const time = new Date().getFullYear();
//   console.log(method, url, time);
//   next();
// };
