import sendRequest from "../utils/sendRequest";

export function getScopeOfWorks() {
  return sendRequest(`/scopeOfWorks`);
}
