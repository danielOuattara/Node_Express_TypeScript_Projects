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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailRealAccount = exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: process.env.USER_ACCOUNT,
            pass: process.env.PASS_ACCOUNT,
        },
    });
    let info = yield transporter.sendMail({
        from: '"Ricatti" <ricatti@gmx.fr>',
        to: "bar@example.com, baz@example.com, idell.aufderhar@ethereal.email",
        subject: "Hello ✔",
        html: "<b>Hello world?</b>",
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    res.json({ info });
});
exports.sendEmail = sendEmail;
const sendEmailRealAccount = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PSWD,
        },
    });
    let info = yield transporter.sendMail({
        from: process.env.ADMIN_EMAIL,
        to: 'ricatti.ricci@gmail.com, "Ricatti" <ricatti@gmx.fr>, "Daniel" <daniel.ouattara@yahoo.com>',
        subject: "Hello ✔",
        html: "<b>Hello world?</b>",
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    res.json({ info });
});
exports.sendEmailRealAccount = sendEmailRealAccount;
module.exports = { sendEmail, sendEmailRealAccount };
