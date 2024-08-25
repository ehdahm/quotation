const itemService = require("../service/items");

async function getItemBySkuId(req, res) {
  try {
    const { skuId } = req.params;
    const item = await itemService.getItemBySkuId(skuId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

module.exports = {
  getItemBySkuId,
};
