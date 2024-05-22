interface ISendResetPasswordEmail {
    name: string;
    email: string;
    passwordToken: string;
    origin: string;
}
export declare const sendResetPasswordEmail: ({ name, email, origin, passwordToken, }: ISendResetPasswordEmail) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export {};
