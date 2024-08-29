import * as quotationsApi from "../apis/quotations";

export async function saveQuotation(quotationData) {
  try {
    console.log("quotationDataToSave", quotationData);
    const newQuotation = await quotationsApi.saveQuotation(quotationData);
    console.log("newQuotation", newQuotation);
    return newQuotation;
  } catch (error) {
    console.error("Error saving quotation", error);
    throw error;
  }
}
export async function getQuotation(quotation_id) {
  try {
    console.log("quotation_id", quotation_id);
    const quotationData = await quotationsApi.getQuotation(quotation_id);
    return quotationData;
  } catch (error) {
    console.error("Error fetching quotation:", error);
    throw error;
  }
}

export async function updateQuotation(quotation_id, quotationData) {
  try {
    console.log("quotationDataToUpdate", quotationData);
    const updatedQuotation = await quotationsApi.updateQuotation(
      quotation_id,
      quotationData
    );
    console.log("updatedQuotation", updatedQuotation);
    return updatedQuotation;
  } catch (error) {
    console.error("Error updating quotation:", error);
    throw error;
  }
}

export async function deleteQuotation(quotation_id) {
  try {
    const deletedQuotationData = await quotationsApi.deleteQuotation(
      quotation_id
    );
    return deletedQuotationData;
  } catch (error) {
    console.error("Error deleting quotation");
  }
}

export async function getQuotationsByClientId(client_id) {
  try {
    console.log("client_id", client_id);
    const quotationData = await quotationsApi.getQuotationsByClientId(
      client_id
    );
    return quotationData;
  } catch (error) {
    console.error("Error fetching quotations by client ID:", error);
    throw error;
  }
}
