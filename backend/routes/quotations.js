var express = require("express");
var router = express.Router();
const quotationController = require("../controllers/quotations");

// CREATE quotation
router.post("/", quotationController.createQuotation);
// EDIT quotation
router.put("/:quotation_id", quotationController.updateQuotation);
// DELETE quotation

// GET quotation
router.get("/:quotationId", quotationController.getQuotation);

module.exports = router;
