const mongoose = require("mongoose");

const quotationItemSchema = new mongoose.Schema(
  {
    user_id: {},
    quotation_id: mongoose.ObjectId,
    scope_id: mongoose.ObjectId,
    room_id: mongoose.ObjectId,
    sku_id: { type: String, required: true },
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

function insertManyQuotationItems(quotationItems) {
  return QuotationItem.insertMany(quotationItems);
}

async function getQuotationItemsByQuotationId(quotation_id) {
  return QuotationItem.find({ quotation_id });
}

function updateQuotationItems(itemId, itemData) {
  return QuotationItem.findByIdAndUpdate(itemId, itemData, { new: true });
}

function createQuotationItems(quotationItems) {
  return QuotationItem.create(quotationItems);
}

function deleteMany(filterQuery) {
  return QuotationItem.deleteMany(filterQuery);
}

module.exports = {
  insertManyQuotationItems,
  getQuotationItemsByQuotationId,
  updateQuotationItems,
  createQuotationItems,
  deleteMany,
};
