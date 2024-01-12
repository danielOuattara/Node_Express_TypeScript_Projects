import { NextFunction, Request, Response, ErrorRequestHandler } from "express";


const customErrorHandler = (err: ErrorRequestHandler, req: Request, res:Response, next: NextFunction) => {
	  
  res.status(500).send({err})
}


export default customErrorHandler