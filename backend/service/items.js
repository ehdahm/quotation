const itemDAO = require("../daos/items");
const itemModel = require("../models/items");

async function getItemBySkuId(skuId) {
  const daoItem = await itemDAO.findBySkuId(skuId);
  console.log("daoItem", daoItem);
  return daoItem ? itemModel.fromDAO(daoItem) : null;
}

module.exports = {
  getItemBySkuId,
};
