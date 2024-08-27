var express = require("express");
var router = express.Router();
var roomController = require("../controllers/rooms");

// get all rooms
// returns an array of rooms
router.get("/", roomController.getRooms);

module.exports = router;
