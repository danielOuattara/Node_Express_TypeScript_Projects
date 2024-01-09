import { Request, Response } from "express";

let { people } = require("./../data");

//--------------------------------------------------------------------
const getPeople = (_req: Request, res: Response) => {
  return res.status(200).json({ success: true, people });
};

//---------------------------------------------------------------------
const postPeople = (req: Request, res: Response) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  people = [...people, { id: people.length + 1, name: req.body.name }];
  console.log("people = ", people);
  return res.status(201).send("success");
};

//---------------------------------------------------------------------
const postPostman = (req: Request, res: Response) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, msg: "please provide name value" });
  }
  people = [...people, { id: people.length + 1, name: req.body.name }];
  console.log("people = ", people);
  res.status(201).json({ success: true, data: people });
};

//--------------------------------------------------------------------
const putPeople = (req: Request, res: Response) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ success: false, msg: `Please, provide a content to be updated` });
  }

  const person = people.find(
    (person: People) => person.id === parseInt(req.params.id),
  );
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }
  person.name = req.body.name;
  res.status(200).json({ success: true, data: people });
};

//--------------------------------------------------------------------
const deletePeople = (req: Request, res: Response) => {
  const person = people.find(
    (person: People) => person.id === parseInt(req.params.id),
  );
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with id ${req.params.id}` });
  }

  const indexToDelete = people.findIndex(
    (person: People) => person.id === parseInt(req.params.id),
  );
  people.splice(indexToDelete, 1);
  return res.status(200).json({ success: true, people });
};

export { getPeople, postPeople, postPostman, putPeople, deletePeople };
