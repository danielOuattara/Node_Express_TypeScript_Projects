"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let { people } = require("./../data");
const router = (0, express_1.Router)();
//--------------------------------------------------------------------
router.get("/", (_req, res) => {
    return res.status(200).json({ success: true, people });
});
//---------------------------------------------------------------------
router.post("/", (req, res) => {
    if (!req.body.name) {
        return res
            .status(400)
            .json({ success: false, msg: "please provide name value" });
    }
    people = [...people, { id: people.length + 1, name: req.body.name }];
    console.log("people = ", people);
    return res.status(201).send("success");
});
//---------------------------------------------------------------------
router.post("/postman", (req, res) => {
    if (!req.body.name) {
        return res
            .status(400)
            .json({ success: false, msg: "please provide name value" });
    }
    people = [...people, { id: people.length + 1, name: req.body.name }];
    console.log("people = ", people);
    res.status(201).json({ success: true, data: people });
});
//--------------------------------------------------------------------
router.put("/:id", (req, res) => {
    if (!req.body.name) {
        return res
            .status(400)
            .json({ success: false, msg: `Please, provide a content to be updated` });
    }
    const person = people.find((person) => person.id === parseInt(req.params.id));
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${req.params.id}` });
    }
    person.name = req.body.name;
    res.status(200).json({ success: true, data: people });
});
//--------------------------------------------------------------------
router.delete("/:id", (req, res) => {
    const person = people.find((person) => person.id === parseInt(req.params.id));
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${req.params.id}` });
    }
    const indexToDelete = people.findIndex((person) => person.id === parseInt(req.params.id));
    people.splice(indexToDelete, 1);
    return res.status(200).json({ success: true, people });
});
exports.default = router;
