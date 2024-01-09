"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let { people } = require("./../data");
const router = (0, express_1.Router)();
const peopleControllers_1 = require("./../controllers/peopleControllers");
// //----------------------- // method 1
// router.get("/", getPeople);
// router.post("/", postPeople);
// router.post("/postman", postPostman);
// router.put("/:id", putPeople);
// router.delete("/:id", deletePeople);
//-------------------------- // method 2 : chaining identical routes requests
router.route('/').get(peopleControllers_1.getPeople).post(peopleControllers_1.postPeople);
router.post("/postman", peopleControllers_1.postPostman);
router.route('/:id').put(peopleControllers_1.putPeople).delete(peopleControllers_1.deletePeople);
exports.default = router;
