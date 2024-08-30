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

export async function updateClient(clientId, clientData) {
  try {
    const updatedClient = await clientsApi.updateClient(clientId, clientData);
    return updatedClient;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
}

export async function deleteClient(clientId) {
  try {
    const deletedClient = await clientsApi.deleteClient(clientId);
    return deletedClient;
  } catch (error) {
    console.error("Error creating client:", error);
    throw error;
  }
}
