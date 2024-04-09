interface IFakeStripeAPI {
    amount: number;
    currency: string;
}
export declare const fakeStripAPI: ({ amount, currency }: IFakeStripeAPI) => Promise<{
    clientSecret: string;
    amount: number;
    currency: string;
}>;
export {};
