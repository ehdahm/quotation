var express = require("express");
var router = express.Router();
const quotationController = require("../controllers/quotations");

// CREATE quotation
router.post("/", quotationController.createQuotation);
// EDIT quotation

// DELETE quotation

// GET quotation
router.get("/:quotationId", quotationController.getQuotation);

module.exports = router;
