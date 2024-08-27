const quotationService = require("../service/quotations");

async function createQuotation(req, res) {
  try {
    // destructure the required attributes
    const { quotation, quotationItems } = req.body;

    if (!quotation) {
      return res.status(404).json({ message: "Error in creating quotation" });
    }

    const createdQuotation = await quotationService.createQuotation(
      quotation,
      quotationItems
    );

    res.status(201).json(createdQuotation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  createQuotation,
};
