import mongoose from "mongoose";

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(`can't connect to db, ${error}`);
    }
}

export default dbConnect;