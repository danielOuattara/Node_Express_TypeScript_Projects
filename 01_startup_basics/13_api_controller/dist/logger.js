"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, _res, next) => {
    console.log(req.method, req.url, new Date().getFullYear());
    next();
};
exports.logger = logger;
//-------------------------------------------------------
// exports = (req, res, next): RequestHandler => {
//   const method = req.method;
//   const url = req.url;
//   const time = new Date().getFullYear();
//   console.log(method, url, time);
//   next();
// };
