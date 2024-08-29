import sendRequest from "../utils/sendRequest";

export function getClients() {
  return sendRequest(`/clients`);
}
