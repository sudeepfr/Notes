import mongoose, { connect } from "mongoose";

const connectDB=async()=>{
     try{
         await mongoose.connect(`${process.env.MONGODB_URL}/noteList`);
         console.log("Database connected");
     }catch(e){
         console.error("MongoDB connection failed:", e.message);
     }
}

export default connectDB;