import axios from "axios";
import { Client, QuotationItem } from "../types";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchClients = async (): Promise<Client[]> => {
  const response = await axios.get(`${API_URL}/clients`);
  return response.data;
};

export const fetchClientDetails = async (clientId: string): Promise<Client> => {
  const response = await axios.get(`${API_URL}/clients/${clientId}`);
  return response.data;
};

export const fetchItems = async (): Promise<QuotationItem[]> => {
  const response = await axios.get(`${API_URL}/items`);
  return response.data;
};

export const createQuotation = async (
  clientId: string,
  items: QuotationItem[]
): Promise<void> => {
  await axios.post(`${API_URL}/quotations`, { clientId, items });
};
