import { Request, Response, Router } from "express";

let { people } = require("./../data");
const router = Router();

//---------------------------------------------------------------------
router.post("", (req: Request, res: Response) => {
  console.log(req.body.name);
  if (req.body.name) {
    people = [...people, { id: people.length + 1, name: req.body.name }];
    return res.status(201).redirect("index.html");
  }
  res.status(400).send("Please Provide Credentials");
});

export default router;
