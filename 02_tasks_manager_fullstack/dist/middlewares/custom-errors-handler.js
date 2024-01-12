"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrorHandler = (err, req, res, next) => {
    res.status(500).send({ err });
};
exports.default = customErrorHandler;
