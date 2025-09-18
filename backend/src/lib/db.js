import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) throw new Error("MONGO_URI is not set!");
        

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "near_messaging"
        });
        console.log("MongoDB Connected!", conn.connection.host);
    } catch (error) {
        console.error("Error connection to MongoDB:", error);
        process.exit(1);
    }
}