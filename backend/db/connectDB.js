import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // console.log(process.env.MONGO_URI);
     mongoose.connection.on("connected", ()=>{
      console.log("Database Connected");
      
     })
    const connect_DATABASE = await mongoose.connect(`${process.env.MONGO_URI}/AuthInMongo`);
    // console.log(`MongoDB Connected: ${connect_DATABASE.connection.host}`);
  } catch (error) {
    console.log(`Error connection to MongoDB: ${error.message}`);
    process.exit(1); // 1 is failure, 0 status code is success
  }
};


