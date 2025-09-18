import mongoose from "mongoose";

export const connectDB = async () => {
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI, {
                dbName: "near_messaging"
            });
            console.log("MongoDB Connected!", conn.connection.host);
        } catch (error) {
            console.error("Error connection to MongoDB:" , error);
            process.exit(1);            
        }
}