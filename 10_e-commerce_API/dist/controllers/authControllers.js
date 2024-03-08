"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const register = (_req, res) => {
    res.send("register user");
};
exports.register = register;
const login = (_req, res) => {
    res.send("login user");
};
exports.login = login;
const logout = (_req, res) => {
    res.send("logout user");
};
exports.logout = logout;
