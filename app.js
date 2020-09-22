/* Authentication with JWT using Express
 */

// Adding Dependencies
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
//  Import routes
const authRoute = require("./routers/auth");

dotenv.config();

// Connect to database
mongoose.connect(process.env.DB_ADDRESS, () => {
  console.log("Application connected successfully to DB");
});

// Basic variables
const app = express();
const port = process.env.PORT || 1337;

// Middleware functionalities
app.use(express.json());

// Creating route middlewares
app.use("/api/users", authRoute);

// Initializing the server
app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
});
