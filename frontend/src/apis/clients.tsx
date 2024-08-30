import sendRequest from "../utils/sendRequest";

export function getClients() {
  return sendRequest(`/clients`);
}

// read token to local storage
