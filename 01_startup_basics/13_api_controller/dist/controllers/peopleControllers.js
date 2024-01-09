"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePeople = exports.putPeople = exports.postPostman = exports.postPeople = exports.getPeople = void 0;
let { people } = require("./../data");
//--------------------------------------------------------------------
const getPeople = (_req, res) => {
    return res.status(200).json({ success: true, people });
};
exports.getPeople = getPeople;
//---------------------------------------------------------------------
const postPeople = (req, res) => {
    if (!req.body.name) {
        return res
            .status(400)
            .json({ success: false, msg: "please provide name value" });
    }
    people = [...people, { id: people.length + 1, name: req.body.name }];
    console.log("people = ", people);
    return res.status(201).send("success");
};
exports.postPeople = postPeople;
//---------------------------------------------------------------------
const postPostman = (req, res) => {
    if (!req.body.name) {
        return res
            .status(400)
            .json({ success: false, msg: "please provide name value" });
    }
    people = [...people, { id: people.length + 1, name: req.body.name }];
    console.log("people = ", people);
    res.status(201).json({ success: true, data: people });
};
exports.postPostman = postPostman;
//--------------------------------------------------------------------
const putPeople = (req, res) => {
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
};
exports.putPeople = putPeople;
//--------------------------------------------------------------------
const deletePeople = (req, res) => {
    const person = people.find((person) => person.id === parseInt(req.params.id));
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${req.params.id}` });
    }
    const indexToDelete = people.findIndex((person) => person.id === parseInt(req.params.id));
    people.splice(indexToDelete, 1);
    return res.status(200).json({ success: true, people });
};
exports.deletePeople = deletePeople;
