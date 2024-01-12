import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  return res
    .status(404)
    .send(
      `<h1> 404 :( Sorry...Route ${req.url} not found !  <br/> <a href="/">Go back to home</a></h1>`,
    );
};
