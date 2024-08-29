import { QuotationItem, Room, Scope } from "../types";

export const updateScopes = (
  scopes: Scope[],
  scopeId: string,
  updateFn: (scope: Scope) => Scope
): Scope[] => {
  return scopes.map((scope) =>
    scope.id === scopeId ? updateFn(scope) : scope
  );
};

export const updateRooms = (
  rooms: Room[],
  roomId: string,
  updateFn: (room: Room) => Room
): Room[] => {
  return rooms.map((room) => (room.id === roomId ? updateFn(room) : room));
};

export const updateItems = (
  items: QuotationItem[],
  itemId: string,
  updateFn: (item: QuotationItem) => QuotationItem
): QuotationItem[] => {
  return items.map((item) => (item._id === itemId ? updateFn(item) : item));
};
