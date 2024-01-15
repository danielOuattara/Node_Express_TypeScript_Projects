"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrorHandler = (err, _req, res, _next) => {
    console.log("err = ", err);
    return res.status(450).json({ message: err.message });
};
exports.default = customErrorHandler;
