const express = require("express");
const cors = require("cors");
const bookRoute = require("./routes/booksRoutes");
require('dotenv').config();  // Import dotenv to use environment variables
require("./connection/conn");  // Your DB connection

const app = express();

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/v1', bookRoute);

// Dynamic port using env variable, with a fallback to port 1000
const PORT = process.env.PORT || 1000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server started successfully on port ${PORT}`);
});
