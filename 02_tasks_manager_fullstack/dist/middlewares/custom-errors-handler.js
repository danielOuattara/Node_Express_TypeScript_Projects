"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("./../errors/customError");
const customErrorHandler = (err, _req, res, _next) => {
    if (err instanceof customError_1.CustomAPIError) {
        return res.status(err.statusCode).json(err.message);
    }
    else {
        return res.status(500).json(err.message);
    }
};
exports.default = customErrorHandler;
