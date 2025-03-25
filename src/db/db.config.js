import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const db = mongoose.connect(process.env.MONGO_URI);
        
        if(db) {
            // console.log(`Database connected 🙂 HOST: ${db.connection.host}`);
            console.log(`Database connected 🙂`);
        }
    }
    catch(err) {
        console.error(err.message);
    }
}