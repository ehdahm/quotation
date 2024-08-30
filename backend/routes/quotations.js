var express = require("express");
var router = express.Router();
const quotationController = require("../controllers/quotations");
var security = require("../middlewares/security");

// CREATE quotation
router.post("/", security.checkJWT, quotationController.createQuotation);
// EDIT quotation
router.put(
  "/:quotation_id",
  security.checkJWT,
  quotationController.updateQuotation
);
// DELETE quotation
router.delete(
  "/:quotationId",
  security.checkJWT,
  quotationController.deleteQuotation
);

// GET all quotations
router.get("/", quotationController.getQuotations);

// get quotation by id
router.get("/:quotationId", quotationController.getQuotation);
module.exports = router;
