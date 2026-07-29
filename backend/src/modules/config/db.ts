import mongoose from "mongoose";
import { MONGO_URL } from "../../environmentValidation";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(String(MONGO_URL));

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (dbError) {
    console.error("MongoDB connection failed:", dbError);
    process.exit(1);
  }
};

export default connectDB;