import { RequestHandler } from "express";

// Extend the Request interface to include your custom user property
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export const authorize: RequestHandler = (req, res, next) => {
  if (req.query.user === "daniel") {
    console.log("User Authorized !");
    req.user = { name: "daniel", secret: "1234", id: "ident" };
    next();
  } else {
    return res.status(401).send("User Not Authorized !");
  }
};

