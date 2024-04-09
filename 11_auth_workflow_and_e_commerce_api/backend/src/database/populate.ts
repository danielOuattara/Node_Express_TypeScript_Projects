//---------------------------------------------------- version 1

// import dotenv from "dotenv";
// dotenv.config({ path: "./../../.env" });
// import { connectToDB } from "./connect";
// import Job from "./../models/JobModel";
// import jobsMockData from "./mock-data.json";
// import mongoose from "mongoose";

// connectToDB(process.env.MONGO_URI as string)
//   .then(() => {
//     console.log("Connection Success: ready to populate !");
//     return Job.deleteMany({});
//   })
//   .then(() => {
//     console.log("Previous data deleted successfully.");
//     return Job.create(jobsMockData);
//   })
//   .then(() => {
//     console.log("Populate: Success !");
//     mongoose.connection.close();
//     process.exit(0);
//   })
//   .catch((error) => {
//     console.log({ ERROR: error.message });
//     process.exit(1);
//   });

//---------------------------------------------------- version 2
// import dotenv from "dotenv";
// dotenv.config({ path: "./../../.env" });
// import { connectToDB } from "./connect";
// import Job from "./../models/JobModel";
// import jobsMockData from "./mock-data.json";
// import mongoose from "mongoose";

// async function populateDatabase() {
//   try {
//     /* Connect to the database */
//     await connectToDB(process.env.MONGO_URI as string);
//     console.log("Connection Success: ready to populate !");

//     /* Delete existing data */
//     await Job.deleteMany({});
//     console.log("Previous data deleted successfully.");

//     /* Insert mock data */
//     await Job.create(jobsMockData);
//     console.log("Populate: Success !");

//     /* Close the database connection;
//        uncomment the line if you're using Mongoose for connection management
//     */
//     await mongoose.connection.close();

//     process.exit(0);
//   } catch (error) {
//     console.error("Error occurred during population:", error);
//     process.exit(1);
//   }
// }

// populateDatabase();

/* Note: In Terminal, run : `ts-node populate.ts` to execute this populate function  */
