const Client = require("../models/client"); // Assuming your model file is named client.js
const mssql = require("mssql");
const config = require("../config/config").development;

// Create a new client
async function createClient(req, res) {
  const pool = await mssql.connect(config);

  try {
    const {
      name,
      email,
      phone,
      company_name,
      preferred_contact,
      client_location,
    } = req.body;

    const query = `
      INSERT INTO Clients (name, email, phone, company_name, preferred_contact, client_location, createdAt, updatedAt)
      OUTPUT INSERTED.id
      VALUES (@name, @email, @phone, @company_name, @preferred_contact, @client_location, GETUTCDATE(), GETUTCDATE())
    `;

    const request = pool.request();
    request.input("name", name);
    request.input("email", email);
    request.input("phone", phone);
    request.input("company_name", company_name);
    request.input("preferred_contact", preferred_contact);
    request.input("client_location", client_location);

    // Execute the query
    const result = await request.query(query);
    const newClient = result.recordset[0];

    if (newClient) {
      res
        .status(201)
        .json({ message: "Client created successfully!", data: newClient });
    } else {
      throw new Error("Error creating client");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating client" });
  } finally {
    await pool.close();
  }
}

// Get all clients
async function getClients(req, res) {
  try {
    const pool = await mssql.connect(config);
    const query = "SELECT * FROM Clients";
    const clients = await pool.request().query(query);
    res.status(200).json(clients.recordsets[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createClient, getClients };
