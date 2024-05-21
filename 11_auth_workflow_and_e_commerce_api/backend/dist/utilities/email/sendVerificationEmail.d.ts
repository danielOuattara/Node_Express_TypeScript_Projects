interface ISendVerificationEmail {
    name: string;
    email: string;
    verificationToken: string;
    origin: string;
}
export declare const sendVerificationEmail: ({ name, email, verificationToken, origin, }: ISendVerificationEmail) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export {};
