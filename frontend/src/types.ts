export interface Client {
  _id: string;
  name: string;
  phone: string;
  address: string;
}

export interface QuotationItem {
  _id: string;
  skuId: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  cost: number;
  price: number;
  margin: number;
  total: number;
  isEditing: boolean;
}
