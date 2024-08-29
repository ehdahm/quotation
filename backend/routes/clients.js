var express = require("express");
var router = express.Router();
var clientController = require("../controllers/clients");

// GET all clients
router.get("/", clientController.getClients);
// UPDATE a client's detail

// CREATE a client

// DELETE a client

module.exports = router;
