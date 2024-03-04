import { RequestHandler } from "express";

const stripeController: RequestHandler = async (req, res) => {
  console.log("stripe controller");
  console.log(req.body);
  res.send("Stripe route");
};

export { stripeController };
