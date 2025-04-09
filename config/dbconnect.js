import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectTOMongoDB = async () => {
    try {
        const mongoURI = process.env.MONGO_DB_URL;
        if (!mongoURI) {
            throw new Error("MONGO_DB_URL is not defined in .env file.");
        }

        await mongoose.connect(mongoURI); // ✅ Remove deprecated options
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Error in connecting DB:", error.message);
    }
};

export default connectTOMongoDB;
