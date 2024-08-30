import sendRequest from "../utils/sendRequest";

export function getClients() {
  return sendRequest(`/clients`);
}

export function createClient(clientData) {
  return sendRequest("/clients", "POST", clientData);
}

export function updateClient(clientId, clientData) {
  return sendRequest(`/clients/${clientId}`, "POST", clientData);
}
export function deleteClient(clientId) {
  return sendRequest(`/clients/${clientId}`, "DELETE");
}
