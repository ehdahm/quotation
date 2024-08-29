const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
  {
    user_id: {},
    client_id: {},
    total_cost: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    profit_margin: { type: Number, required: true },
  },
  { timestamps: true }
);

const Quotation = mongoose.model("Quotation", quotationSchema);

function createQuotation(quotationData) {
  return Quotation.create(quotationData);
}

function getQuotation(quotationId) {
  return Quotation.findById(quotationId);
}

function updateQuotation(quotationId, quotationData) {
  return Quotation.findByIdAndUpdate(quotationId, quotationData, { new: true });
}

function deleteQuotation(quotationId) {
  return Quotation.findByIdAndDelete(quotationId);
}

module.exports = {
  createQuotation,
  getQuotation,
  updateQuotation,
  deleteQuotation,
};
