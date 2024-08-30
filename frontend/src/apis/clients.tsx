import sendRequest from "../utils/sendRequest";

export function getClients() {
  return sendRequest(`/clients`);
}

export function createClient(clientData) {
  return sendRequest("/clients", "POST", clientData);
}
