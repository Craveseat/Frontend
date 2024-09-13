import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message); // Now TypeScript knows error is of type Error
    } else {
      console.log("An unknown error occurred");
    }
    process.exit(1);
  }
};

export default connectDB;
