 import mongoose from "mongoose";

const connectParams: {[key: string]: string|boolean | number} = {};
export const connectToDB = (uri: string) => mongoose.connect(uri, connectParams);
