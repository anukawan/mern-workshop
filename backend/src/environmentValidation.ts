import dotenv from "dotenv";
dotenv.config();

console.log("MONGO_URI =", process.env.MONGO_URI);

export const MONGO_URL = process.env.MONGO_URI;
export const JWT_SECRET = process.env.JWT_SECRET;