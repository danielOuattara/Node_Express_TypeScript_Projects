interface IFakeStripeAPI {
  amount: number;
  currency: string;
}

export const fakeStripAPI = async ({ amount, currency }: IFakeStripeAPI) => {
  const clientSecret = "someRandomClientSecretValue";
  return { clientSecret, amount, currency };
};
