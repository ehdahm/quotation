const mongoose = require("mongoose");

const quotationItemSchema = new mongoose.Schema(
  {
    user_id: {},
    quotation_id: mongoose.ObjectId,
    scope_id: mongoose.ObjectId,
    room_id: mongoose.ObjectId,
    name: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    unit: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    margin: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

const QuotationItem = mongoose.model("QuotationItem", quotationItemSchema);

// i can add an arr of obj
function insertManyQuotationItems(quotationItems) {
  return QuotationItem.insertMany(quotationItems);
}
async function getQuotationItemsById(quotation_id) {
  return QuotationItem.find({ quotation_id });
}
module.exports = {
  insertManyQuotationItems,
  getQuotationItemsById,
};
