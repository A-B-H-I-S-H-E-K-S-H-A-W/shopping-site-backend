import { connect } from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const mongodbConnectionString = `${process.env.MONGODB_URI}/${DB_NAME}`;
    const connectionDB = await connect(mongodbConnectionString);

    return connectionDB;
  } catch (error) {
    console.log("Error connecting to mongodb ::::", error);
    console.log("Internal server error");
    process.exit(1);
  }
};
