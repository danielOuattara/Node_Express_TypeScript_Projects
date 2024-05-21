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
exports.sendVerificationEmail = void 0;
const sendEmail_1 = require("./sendEmail");
const sendVerificationEmail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, email, verificationToken, origin, }) {
    const verifyEmailLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
    const message = `<p>Please confirm your email: <a href="${verifyEmailLink}">click here</a> </p>`;
    return yield (0, sendEmail_1.sendEmail)({
        from: `"Admin" <ricatti@gmx.fr>`,
        to: email,
        subject: "Email confirmation",
        html: `<h4> Hello ${name}</h4> 
    ${message}`,
    });
});
exports.sendVerificationEmail = sendVerificationEmail;
