import sendRequest from "../utils/sendRequest";

export function saveQuotation(quotationData) {
  return sendRequest(`/quotations`, "POST", quotationData);
}
export function getQuotation(quotation_id) {
  return sendRequest(`/quotations/${quotation_id}`);
}
