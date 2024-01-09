"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let { people } = require("./../data");
const router = (0, express_1.Router)();
//---------------------------------------------------------------------
router.post("", (req, res) => {
    console.log(req.body.name);
    if (req.body.name) {
        people = [...people, { id: people.length + 1, name: req.body.name }];
        return res.status(201).redirect("index.html");
    }
    res.status(400).send("Please Provide Credentials");
});
exports.default = router;
