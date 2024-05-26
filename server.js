// server.js
require("dotenv").config();
const express = require("express");
const { Sequelize } = require("sequelize");
const tasksRouter = require("./routes/taskRouter");
const clientRouter = require("./routes/clientRouter");

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// routes middleware
app.use("/tasks", tasksRouter);
app.use("/clients", clientRouter);

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: "mssql",
  host: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  define: {
    timestamps: false, // Disable timestamps by default
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Define models and relationships here

// Define routes and middleware here

// Example route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
