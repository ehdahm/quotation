const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
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
module.exports = {
  findBySkuId,
};
