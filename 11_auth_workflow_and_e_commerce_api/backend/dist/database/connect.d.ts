import mongoose from "mongoose";
export declare const connectToDB: (uri: string) => Promise<typeof mongoose>;
