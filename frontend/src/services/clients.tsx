import * as clientsApi from "../apis/clients";

export async function getClients() {
  try {
    const clients = await clientsApi.getClients();
    return clients;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
}

export async function createClient(clientData) {
  try {
    const createdClient = await clientsApi.createClient(clientData);
    return createdClient;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
}
