function createItem(skuId, name, description, unit, cost, price, margin) {
  return {
    skuId,
    name,
    description,
    unit,
    cost,
    price,
    margin,
    calculateTotal: (quantity) => price * quantity,
  };
}

function fromDAO(daoItem) {
  return createItem(
    daoItem.skuId,
    daoItem.name,
    daoItem.description,
    daoItem.unit,
    daoItem.cost,
    daoItem.price,
    daoItem.margin
  );
}

function toDAO(item) {
  return {
    skuId: item.skuId,
    name: item.name,
    description: item.description,
    unit: item.unit,
    cost: item.cost,
    price: item.price,
    margin: item.margin,
  };
}

module.exports = {
  createItem,
  fromDAO,
  toDAO,
};
