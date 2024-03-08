import { RequestHandler } from "express";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_PRIVATE as string);

const createCustomer = async () => {
  const params: Stripe.CustomerCreateParams = {
    description: "test customer",
  };

  const customer: Stripe.Customer = await stripe.customers.create(params);

  console.log(customer.id);
};
createCustomer();

const stripeController: RequestHandler = async (req, res) => {
  console.log(req.body);
  const { purchase, total_amount, shipping_fee } = req.body;

  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "eur",
  });

  console.log("paymentIntent = ", paymentIntent);
  res.json({ clientSecret: paymentIntent.client_secret });
};

export { stripeController };
