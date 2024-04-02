"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuthOrAdmin = void 0;
const errors_1 = require("../errors");
const checkAuthOrAdmin = (requestUser, resourceUserId) => {
    if (requestUser.role === "admin")
        return;
    if (requestUser._id.equals(resourceUserId))
        return;
    throw new errors_1.UnauthenticatedError("Access denied");
};
exports.checkAuthOrAdmin = checkAuthOrAdmin;
