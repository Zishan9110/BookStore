require('dotenv').config({ path: './connection/.env' });  // Load .env from the connection folder
const mongoose = require("mongoose");

// Verify if the MongoDB URI is being loaded
console.log("MongoDB URI:", process.env.MONGODB_URI);

// Use the connection string from the .env file
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) => {
    console.error("Database connection error:", err);
});
