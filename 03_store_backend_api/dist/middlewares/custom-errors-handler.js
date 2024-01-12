"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrorHandler = (err, _req, res, _next) => {
    return res.status(500).json(err.message);
};
exports.default = customErrorHandler;
