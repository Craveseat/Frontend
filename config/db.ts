import mongoose from "mongoose";

let isConnected = false; // Track connection state

export const connectDB = async (): Promise<typeof mongoose> => {
  if (isConnected) {
    console.log("✅ MongoDB already connected.");
    return mongoose;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("❌ MONGO_URL environment variable is missing.");
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.MONGO_DB_NAME || "myapp",
    });

    isConnected = mongoose.connection.readyState === 1;

    if (!conn.connection.host) {
      throw new Error("❌ MongoDb not connected");
    }
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
};
