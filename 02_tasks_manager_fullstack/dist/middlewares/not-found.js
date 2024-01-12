"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res) => {
    return res
        .status(404)
        .send(`<h1> 404 :( Sorry...Route ${req.url} not found !  <br/> <a href="/">Go back to home</a></h1>`);
};
exports.notFound = notFound;
