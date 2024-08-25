const itemDAO = require("../daos/item-dao");
const itemModel = require("../models/item-model");

async function getItemBySkuId(skuId) {
  const daoItem = await itemDAO.findBySkuId(skuId);
  return daoItem ? itemModel.fromDAO(daoItem) : null;
}

module.exports = {
  getItemBySkuId,
};
