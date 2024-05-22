"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetPasswordEmail = void 0;
const sendEmail_1 = require("./sendEmail");
const sendResetPasswordEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, origin, passwordToken, }) {
    const resetPasswordLink = `${origin}/user/reset-password?token=${passwordToken}&email=${email}`;
    const message = `<p>To reset your password <a href="${resetPasswordLink}" target="_blank">click here</a> </p>`;
    return (0, sendEmail_1.sendEmail)({
        from: `"Admin" <ricatti@gmx.fr>`,
        to: email,
        subject: "Reset Password",
        html: `<h4> Hello ${name}</h4> ${message} `,
    });
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;
