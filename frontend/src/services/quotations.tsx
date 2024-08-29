import * as quotationsApi from "../apis/quotations";

export async function saveQuotation(quotationData) {
  try {
    console.log("quotationData", quotationData);
    const newQuotation = await quotationsApi.saveQuotation(quotationData);
    console.log("newQuotation", newQuotation);
    return newQuotation;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}
export async function getQuotation(quotation_id) {
  try {
    console.log("quotation_id", quotation_id);
    const quotationData = await quotationsApi.getQuotation(quotation_id);
    return quotationData;
  } catch (error) {
    console.error("Error fetching item:", error);
    throw error;
  }
}
