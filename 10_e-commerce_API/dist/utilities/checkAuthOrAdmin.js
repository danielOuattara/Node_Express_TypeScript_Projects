"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthOrAdmin = void 0;
const errors_1 = require("../errors");
const checkAuthOrAdmin = (requestUser, resourceUserId = "") => {
    var _a;
    if (requestUser.role === "admin")
        return;
    if (((_a = requestUser._id) === null || _a === void 0 ? void 0 : _a.toString()) === resourceUserId.toString())
        return;
    throw new errors_1.UnauthenticatedError("Access denied");
};
exports.checkAuthOrAdmin = checkAuthOrAdmin;
