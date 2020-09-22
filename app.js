/* Authentication with JWT using Express
 */

// Adding Dependencies
const express = require("express");
const mongoose = require("mongoose");

// Connect to database
mongoose.connect("", () => {
  console.log("Application connected successfully to DB");
});

//  Import routes
const authRoute = require("./routers/auth");

// Basic variables
const app = express();
const port = process.env.PORT || 1337;

// Creating route middlewares
app.use("/api/users", authRoute);

// Initializing the server
app.listen(port, () => {
  console.log(`Server has started on port: ${port}`);
});
