"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodemailerConfig = void 0;
exports.nodemailerConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: process.env.USER_ACCOUNT_ETHEREAL,
        pass: process.env.PASS_ACCOUNT_ETHEREAL,
    },
};
