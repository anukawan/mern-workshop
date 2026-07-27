import moongoose from "mongoose";
import { MONGO_URL } from "../../environmentValidation";

const connectDB = async () => {
    try{
        const conn = moongoose.connect(String(MONGO_URL));
        console.log("mongo is running")

    } catch (dbError) {
        console.log(dbError);
    }
}
export default connectDB;