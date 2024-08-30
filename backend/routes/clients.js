var express = require("express");
var router = express.Router();
var clientController = require("../controllers/clients");
var security = require("../middlewares/security");

// GET all clients
router.get("/", security.checkLogin, clientController.getClients);
// UPDATE a client's detail

// CREATE a client
router.post("/", security.checkLogin, clientController.createClient);
// DELETE a client

module.exports = router;
