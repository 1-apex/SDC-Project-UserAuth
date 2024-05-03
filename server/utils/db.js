const mongoose = require('mongoose');

const DB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connection successful to database!!");
    } catch (error) {
        console.error("Database connection failed.");
        process.exit(0);
    }
}

module.exports = connectDB;