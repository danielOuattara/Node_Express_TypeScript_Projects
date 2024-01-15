import "dotenv/config";
import { connectToDB } from "./database/connect";
import Product from "./models/productModel";
import jsonProducts from "../products.json";

const start = async () => {
  try {
    await connectToDB(process.env.MONGO_URI as string);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("Success!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
