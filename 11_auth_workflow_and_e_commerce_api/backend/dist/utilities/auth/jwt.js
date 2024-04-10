"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTokenValid = exports.createJWT = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const createJWT = (payload) => (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
});
exports.createJWT = createJWT;
const isTokenValid = (token) => (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
exports.isTokenValid = isTokenValid;
