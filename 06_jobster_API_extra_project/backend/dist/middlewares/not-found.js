"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFound = (_req, res) => {
    return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).send("Route does not exist");
};
exports.default = notFound;
