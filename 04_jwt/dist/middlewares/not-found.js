"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (_req, res) => res.status(404).send("Route does not exist");
exports.default = notFound;
