"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, _req, res, _next) => {
    const customError = {
        statusCode: err.statusCode || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
        message: err.message || "Something wrong, try again later",
        name: err.name || "Custom Error",
    };
    if (err.name === "ValidationError" && err.errors) {
        customError.message = Object.values(err.errors)
            .map((item) => item.message)
            .join(" ");
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        if (err.keyValue) {
            const keys = Object.keys(err.keyValue);
            const values = Object.values(err.keyValue);
            if (keys.length > 0 && values.length > 0) {
                customError.message = `Duplicate ${keys[0]}: ${values[0]} Please, choose another one !`;
            }
        }
        customError.statusCode = http_status_codes_1.StatusCodes.BAD_REQUEST;
    }
    if (err.name === "CastError") {
        customError.message = `No item using Id: ${err.value}`;
        customError.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
    return res.status(customError.statusCode).json({ msg: customError.message });
};
exports.default = errorHandler;
