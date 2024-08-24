export interface Client {
  _id: string;
  name: string;
  phone: string;
  address: string;
}

export interface QuotationItem {
  _id: string;
  name: string;
  room: string;
  quantity: number;
  price: number;
}
