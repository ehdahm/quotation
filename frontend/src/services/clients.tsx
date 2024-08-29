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
