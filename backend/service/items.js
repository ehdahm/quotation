const { default: mongoose } = require("mongoose");
const itemDAO = require("../daos/items");
const itemModel = require("../models/items");

async function getItemBySkuId(skuId) {
  const daoItem = await itemDAO.findBySkuId(skuId);
  // console.log("daoItem", daoItem);
  return daoItem ? itemModel.fromDAO(daoItem) : null;
}

async function getItems(user_id) {
  const userObjectId = new mongoose.Types.ObjectId(user_id);
  const items = await itemDAO.getAllItems(userObjectId);
  return items;
}

module.exports = {
  getItemBySkuId,
  getItems,
};
