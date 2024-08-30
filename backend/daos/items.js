const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.ObjectId, required: true },
    skuId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    unit: { type: String, required: true },
    cost: { type: Number, required: true },
    price: { type: Number, required: true },
    margin: { type: Number, required: true },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

function findBySkuId(skuId) {
  return Item.findOne({ skuId });
}

function getAllItems(user_id) {
  return Item.find({ user_id });
}
module.exports = {
  findBySkuId,
  getAllItems,
};
