import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $match: {
      product: new ObjectId("6601dd5d71ebf5c80f3c8d50"),
    },
  },
  {
    $group: {
      _id: "product",
      aveRageRating: {
        $avg: "$rating",
      },
      numberOfReviews: {
        $sum: +1,
      },
    },
  },
];

const client = await MongoClient.connect(
  "mongodb+srv://ricatti-ricci:**MongoDB77!**@cluster-testing-ricatti.xryll.mongodb.net/",
);
const coll = client.db("John_Smilga_E-Commerce_API").collection("reviews");
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();
