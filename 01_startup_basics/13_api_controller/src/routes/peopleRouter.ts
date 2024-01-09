import { Request, Response, Router } from "express";
let { people } = require("./../data");
const router = Router();

import {
  getPeople,
  postPeople,
  postPostman,
  putPeople,
  deletePeople,
} from "./../controllers/peopleControllers";

// //----------------------- // method 1
// router.get("/", getPeople);
// router.post("/", postPeople);
// router.post("/postman", postPostman);
// router.put("/:id", putPeople);
// router.delete("/:id", deletePeople);


//-------------------------- // method 2 : chaining identical routes requests
router.route('/').get(getPeople).post(postPeople);
router.post("/postman", postPostman);
router.route('/:id').put(putPeople).delete(deletePeople);

export default router;
