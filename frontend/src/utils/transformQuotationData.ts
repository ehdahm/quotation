import { QuotationItem, Scope } from "../types";

interface RawQuotation {
  quotation: Array<{
    _id: string;
    user_id: string;
    client_id: string;
    total_cost: number;
    total_amount: number;
    profit_margin: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }>;
  quotationItems: Array<QuotationItem & { quotation_id: string }>;
}

interface NameIdPair {
  _id: string;
  name: string;
}

export function transformQuotationData(
  quotationData: RawQuotation,
  scopeOfWorks: NameIdPair[],
  rooms: NameIdPair[]
): {
  quotation: RawQuotation["quotation"][0];
  scopes: Scope[];
} {
  const { quotation, quotationItems } = quotationData;

  const scopeMap = new Map(
    scopeOfWorks.map((scope) => [scope._id, scope.name])
  );
  const roomMap = new Map(rooms.map((room) => [room._id, room.name]));

  // Group items by scope_id and room_id
  const groupedItems: Record<string, Record<string, QuotationItem[]>> = {};
  console.log("groupedItems", groupedItems);
  console.log(scopeMap);

  quotationItems.forEach((item) => {
    if (!groupedItems[item.scope_id]) {
      groupedItems[item.scope_id] = {};
    }
    if (!groupedItems[item.scope_id][item.room_id]) {
      groupedItems[item.scope_id][item.room_id] = [];
    }
    groupedItems[item.scope_id][item.room_id].push(item);
  });

  // Transform grouped items into the desired structure
  const scopes: Scope[] = Object.entries(groupedItems).map(
    ([scope_id, rooms]) => ({
      id: scope_id,
      title: scopeMap.get(scope_id)!,
      rooms: Object.entries(rooms).map(([room_id, items]) => ({
        id: room_id,
        name: roomMap.get(room_id)!,
        items: items,
      })),
    })
  );
  console.log("transform output", quotation, scopes);

  return {
    quotation: quotation[0],
    scopes,
  };
}
