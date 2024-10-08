export interface Client {
  _id: string;
  name: string;
  phone: string;
  address: string;
}

export interface QuotationItem {
  _id?: string;
  scope_id: string;
  room_id: string;
  sku_id: string;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  cost: number;
  price: number;
  margin: number;
  total: number;
}

export interface Quotation {
  user_id: string;
  client_id: string;
  total_cost: number;
  total_amount: number;
  profit_margin: number;
}

export interface Scope {
  id: unknown;
  title: string;
  rooms: Room[];
}

export interface Room {
  id: string;
  name: string;
  items: QuotationItem[];
}

export interface ScopeOption {
  _id: string;
  name: string;
}

export interface RoomOption {
  _id: string;
  name: string;
}
