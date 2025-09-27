import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        const dbName = "mactech";
        const uri = process.env.MONGODB_URI.includes("?")
            ? `${process.env.MONGODB_URI}&dbName=${dbName}`
            : `${process.env.MONGODB_URI}/${dbName}`;

        const opts = {
            bufferCommands: false,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000, // fail fast
        };

        cached.promise = mongoose.connect(uri, opts)
            .then(mongoose => mongoose)
            .catch(err => {
                cached.promise = null; // reset so next call retries
                console.error("❌ MongoDB connection failed:", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;