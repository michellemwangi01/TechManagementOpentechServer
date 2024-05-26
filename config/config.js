const dotenv = require("dotenv");
dotenv.config();
const mssql = require("mssql");

const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const server = process.env.DB_SERVER;

console.log(username);

module.exports = {
  development: {
    user: username,
    username: username,
    password: password,
    database: database,
    server: server,
    dialect: "mssql",
    options: {
      trustServerCertificate: true,
    },
  },
  test: {
    user: username,
    username: username,
    password: password,
    database: database,
    server: server,
    dialect: "mssql",
    options: {
      trustServerCertificate: true,
    },
  },
  production: {
    user: username,
    username: username,
    password: password,
    database: database,
    server: server,
    dialect: "mssql",
    options: {
      trustServerCertificate: true,
    },
  },
};

// async function connectToDatabase() {
//   try {
//     const pool = await mssql.connect({
//       user: username,
//       password: password,
//       database: database,
//       server: server,
//       dialect: "mssql",
//       options: {
//         trustServerCertificate: true,
//       },
//     });
//     console.log("Connected to the database successfully");

//     // Perform a simple query
//     const result = await pool.request().query("SELECT * FROM Tasks");
//     console.log(result);

//     // Close the connection pool
//     await pool.close();
//   } catch (err) {
//     console.error("Database connection failed:", err);
//   }
// }

// connectToDatabase();
