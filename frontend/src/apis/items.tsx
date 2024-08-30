import sendRequest from "../utils/sendRequest";

export function getItemBySkuId(skuId: string) {
  return sendRequest(`/items/${skuId}`);
}

export function getItems() {
  return sendRequest(`/items`);
}
