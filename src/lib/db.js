import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error in connecting to MongoDB", error);
    process.exit(1); // 1 means failure
  }
};
































 // ✅ src/lib/db.js
// import { MongoClient } from 'mongodb';

// const uri = 'mongodb://localhost:27017'; // Local MongoDB Compass
// const client = new MongoClient(uri);
// let db;

// export async function connectDB() {
//   if (db) return db;

//   try {
//     await client.connect();
//     db = client.db('streamfy');
//     console.log(' MongoDB (local) connected via Compass');
//     return db;
//   } catch (error) {
//     console.error(' MongoDB connection failed:', error);
//     throw error;
//   }
// }
