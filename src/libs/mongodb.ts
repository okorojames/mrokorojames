import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

let connectionPromise: Promise<typeof mongoose> | null = null;

if (!MONGO_URI) {
  throw new Error("Please define mongodb URI variable");
}

async function connectDB() {
  // if there's already a connection made, maintain the connection
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // Reuse an in-flight connection during concurrent requests, which is common
  // when a page starts more than one data request during a cold start.
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(MONGO_URI!, { bufferCommands: false })
      .catch((error) => {
        connectionPromise = null;
        throw error;
      });
  }

  await connectionPromise;

  return mongoose;
}

export default connectDB;
