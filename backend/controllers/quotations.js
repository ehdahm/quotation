const quotationService = require("../service/quotations");

async function createQuotation(req, res) {
  try {
    const { user_id } = req.user;
    // destructure the required attributes
    const { quotation, quotationItems } = req.body;

    if (!quotation) {
      return res.status(404).json({ message: "Error in creating quotation" });
    }

    const createdQuotation = await quotationService.createQuotation(
      quotation,
      quotationItems,
      user_id
    );

    res.status(201).json(createdQuotation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getQuotation(req, res) {
  try {
    const { quotationId } = req.params;
    const quotationData = await quotationService.getQuotation(quotationId);

    if (!quotationData) {
      return res.status(404).json({ message: "Quotation not found" });
    }
    console.log("quotation", quotationData);
    res.json(quotationData);
  } catch (error) {
    if (error.message === "Quotation not found") {
      res.status(404).json({ message: "Quotation not found" });
    } else {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

async function updateQuotation(req, res) {
  try {
    const { user_id } = req.user;
    console.log(`user_id in quotationUpdate ${user_id}`);
    // destructure the required attributes
    const { quotation_id } = req.params;
    const { quotation, quotationItems } = req.body;

    const updatedQuotation = await quotationService.updateQuotation(
      quotation,
      quotationItems,
      quotation_id
    );

    res.status(201).json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function getQuotations(req, res) {
  try {
    const { clientId } = req.query;
    console.log("reqqueryClientId", clientId);
    const quotations = await quotationService.getQuotationsByClientId(clientId);
    res.json(quotations);
  } catch (error) {
    console.error("Error in getQuotationsByClientId controller:", error);
    res.status(500).json({ message: "Cannot Work" });
  }
}

async function deleteQuotation(req, res) {
  try {
    const { quotationId } = req.params;
    console.log("quotationid in controller: ", quotationId);
    const quotations = await quotationService.deleteQuotation(quotationId);
    res.json(quotations);
  } catch (error) {
    console.error("Error in delete quotations in controller:", error);
    res.status(500).json({ message: "Cannot Work" });
  }
}

module.exports = {
  createQuotation,
  getQuotation,
  updateQuotation,
  getQuotations,
  deleteQuotation,
};
