"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof errors_1.CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Something went wrong try again later");
};
exports.default = errorHandler;
