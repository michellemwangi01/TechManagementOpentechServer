const express = require("express");
const { createClient, getClients } = require("../controllers/clientController");

const clientRouter = express.Router();

clientRouter.post("/", createClient);
clientRouter.get("/", getClients);

module.exports = clientRouter;
