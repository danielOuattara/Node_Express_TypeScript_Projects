"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
// import { people } from "./data";
let { people } = require("./data");
const app = (0, express_1.default)();
// middleware: output the time for the server to send the response
app.use((0, morgan_1.default)("tiny"));
// middleware: serves static assets in /public
app.use(express_1.default.static("./public"));
// parse incoming form data
app.use(express_1.default.urlencoded({ extended: false }));
// parse incoming json data
app.use(express_1.default.json());
//--------------------------------------------------------------------
// Not necessary and not a priority, see in ./public: index.html is a priority
// app.get("/", (_req: Request, res:Response) => {
//   return res.status(200).send("<h1>Welcome, home</h1>");
// });
//--------------------------------------------------------------------
app.get("/api/people", (_req, res) => {
    return res.status(200).json({ success: true, people });
});
//---------------------------------------------------------------------
app.post("/api/people", (req, res) => {
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
app.post("/api/people/postman", (req, res) => {
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
app.put("/api/people/:id", (req, res) => {
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
    /* Useful ??? */
    // const newPeople = people.map((person) => {
    //   if (person.id === Number(req.params.id)) {
    //     person.name = name;
    //   }
    //   return person;
    // })
    person.name = req.body.name;
    res.status(200).json({ success: true, data: people });
});
//--------------------------------------------------------------------
app.delete("/api/people/:id", (req, res) => {
    const person = people.find((person) => person.id === parseInt(req.params.id));
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `no person with id ${req.params.id}` });
    }
    const indexToDelete = people.findIndex((person) => person.id === parseInt(req.params.id));
    people.splice(indexToDelete, 1);
    // const newPeople = people.filter(
    //   (person: People) => person.id !== parseInt(req.params.id)
    // );
    return res.status(200).json({ success: true, people });
});
//---------------------------------------------------------------------
app.post("/login", (req, res) => {
    if (req.body.name) {
        people = [...people, { id: people.length + 1, name: req.body.name }];
        return res.status(201).redirect("index.html");
    }
    res.status(400).send("Please Provide Credentials");
});
app.listen(5000, () => {
    console.log("Server is listening on port http://localhost:5000....");
});
// app.get
// app.post
// app.put
// app.delete
// app.all : for any Verb
// app.use : for middlewares
// app.listen
