import sendRequest from "../utils/sendRequest";

export function saveQuotation(quotationData) {
  return sendRequest(`/quotations`, "POST", quotationData);
}
