var express = require("express");
var router = express.Router();
const quotationController = require("../controllers/quotations");

// CREATE quotation
router.post("/", quotationController.createQuotation);
// EDIT quotation

// DELETE quotation

// view quotation
module.exports = router;
