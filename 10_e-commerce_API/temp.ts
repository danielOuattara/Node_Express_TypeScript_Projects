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
