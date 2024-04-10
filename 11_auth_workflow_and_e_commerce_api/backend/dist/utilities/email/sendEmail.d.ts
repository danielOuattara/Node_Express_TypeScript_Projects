import Mail from "nodemailer/lib/mailer";
export declare const sendEmail: ({ from, to, subject, html }: Mail.Options) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
