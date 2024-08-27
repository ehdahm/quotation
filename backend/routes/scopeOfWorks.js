var express = require("express");
var router = express.Router();
var scopeOfWorksController = require("../controllers/scopeOfWorks");

// get all works
// returns an array of works
router.get("/", scopeOfWorksController.getScopeOfWorks);

module.exports = router;
