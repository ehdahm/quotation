import * as itemsApi from "../apis/items";

export async function getItemBySkuId(skuId: string) {
  try {
    const item = await itemsApi.getItemBySkuId(skuId);
    return item;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}

export async function getItems() {
  try {
    const items = await itemsApi.getItems();
    return items;
  } catch (error) {
    console.error("Error fetching room:", error);
    throw error;
  }
}
