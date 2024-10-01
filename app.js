const express = require("express");
const cors = require("cors");
const bookRoute = require("./routes/booksRoutes");
require('dotenv').config();  // Import dotenv to use environment variables
require("./connection/conn");  // Your DB connection

const app = express();

// Enable CORS for your GitHub Pages frontend
app.use(cors({
    origin: "https://zishan9110.github.io", // Allow requests from your GitHub Pages
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify the methods you want to allow
    credentials: true // Include credentials if needed
}));

app.use(express.json());

// Routes
app.use('/api/v1', bookRoute);

// Dynamic port using env variable, with a fallback to port 1000
const PORT = process.env.PORT || 1000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
