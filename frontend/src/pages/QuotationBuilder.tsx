import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Text,
  Button,
  Box,
  Stack,
  useMantineTheme,
  Group,
  Combobox,
  useCombobox,
  ActionIcon,
  CheckIcon,
} from "@mantine/core";
import { Client, QuotationItem, Quotation, Scope } from "../types";
import ScopeOfWork from "../components/ScopeOfWork";
import * as itemsService from "../services/items";
import * as quotationsService from "../services/quotations";
import { getIdFromName } from "../utils/getIdFromName";
import useStaticData from "../hooks/useStaticData.ts";

const QuotationBuilder: React.FC = () => {
  const theme = useMantineTheme();
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [quotation, setQuotation] = useState<Quotation>({
    user_id: "mockUser", // You might want to set this from your auth context
    client_id: clientId || "", // From the route params
    total_cost: 0,
    total_amount: 0,
    profit_margin: 0,
  });
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>([]);
  const { scopeOfWorks, rooms, isLoading, error } = useStaticData();

  const scopeOfWorkNames = scopeOfWorks.map((scopeOfWork) => scopeOfWork.name);

  const roomNames = rooms.map((room) => room.name);

  const scopeCombobox = useCombobox({
    onDropdownClose: () => scopeCombobox.resetSelectedOption(),
  });

  const handleAddScope = (selectedScope: string) => {
    const newScope: Scope = {
      id: getIdFromName(scopeOfWorks, selectedScope),
      title: selectedScope,
      rooms: [],
    };
    console.log("newScope", newScope);
    setScopes([...scopes, newScope]);
  };

  const handleRemoveScope = (scope_id: string) => {
    setScopes(scopes.filter((scope) => scope.id !== scope_id));
    setQuotationItems(
      quotationItems.filter((item) => item.scope_id !== scope_id)
    );
  };

  const handleAddRoom = (scope_id: string, selectedRoom: string) => {
    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scope_id) {
        const newRoom: Room = {
          id: getIdFromName(rooms, selectedRoom),
          name: selectedRoom,
          items: [],
        };
        console.log("newRoom", newRoom);
        return { ...scope, rooms: [...scope.rooms, newRoom] };
      }
      return scope;
    });
    setScopes(updatedScopes);
  };

  const handleRemoveRoom = (scope_id: string, room_id: string) => {
    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scope_id) {
        return {
          ...scope,
          rooms: scope.rooms.filter((room) => room.id !== room_id),
        };
      }
      return scope;
    });
    setScopes(updatedScopes);
    setQuotationItems(
      quotationItems.filter(
        (item) => item.scope_id !== scope_id || item.room_id !== room_id
      )
    );
  };

  const handleAddItem = (scope_id: string, room_id: string) => {
    const newItem: QuotationItem = {
      _id: `temp-${Date.now()}`, // Temporary ID
      scope_id,
      room_id,
      sku_id: "",
      name: "",
      description: "",
      quantity: 1,
      unit: "",
      cost: 0,
      price: 0,
      margin: 0,
      total: 0,
      isEditing: true,
    };
    setQuotationItems([...quotationItems, newItem]);
    console.log(`add-item: `, quotationItems);

    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scope_id) {
        const updatedRooms = scope.rooms.map((room) => {
          if (room.id === room_id) {
            return { ...room, items: [...room.items, newItem] };
          }
          return room;
        });
        return { ...scope, rooms: updatedRooms };
      }
      return scope;
    });
    setScopes(updatedScopes);
    updateOverallQuotation();
  };

  const updateOverallQuotation = () => {
    const total_cost = quotationItems.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0
    );
    const total_amount = quotationItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const profit_margin = ((total_amount - total_cost) / total_cost) * 100;

    setQuotation((prev) => ({
      ...prev,
      total_cost,
      total_amount,
      profit_margin,
    }));
    console.log(`quotationState `, quotation);
    console.log(`quotaitonItemState `, quotationItems);
  };

  const handleUpdateItem = (
    scope_id: string,
    room_id: string,
    itemId: string,
    updates: Partial<QuotationItem>
  ) => {
    setQuotationItems((prevItems) =>
      prevItems.map((item) =>
        item.scope_id === scope_id &&
        item.room_id === room_id &&
        item._id === itemId
          ? {
              ...item,
              ...updates,
              total:
                (updates.price ?? item.price) *
                (updates.quantity ?? item.quantity),
              margin:
                updates.price && updates.cost
                  ? ((updates.price - updates.cost) / updates.cost) * 100
                  : item.margin,
            }
          : item
      )
    );

    setScopes((prevScopes) =>
      prevScopes.map((scope) =>
        scope.id === scope_id
          ? {
              ...scope,
              rooms: scope.rooms.map((room) =>
                room.id === room_id
                  ? {
                      ...room,
                      items: room.items.map((item) =>
                        item._id === itemId
                          ? {
                              ...item,
                              ...updates,
                              total:
                                (updates.price ?? item.price) *
                                (updates.quantity ?? item.quantity),
                              margin:
                                updates.price && updates.cost
                                  ? ((updates.price - updates.cost) /
                                      updates.cost) *
                                    100
                                  : item.margin,
                            }
                          : item
                      ),
                    }
                  : room
              ),
            }
          : scope
      )
    );

    // Update overall quotation
    updateOverallQuotation();
  };

  const handleCommitItem = async (
    scope_id: string,
    room_id: string,
    itemId: string
  ) => {
    try {
      const item = quotationItems.find((item) => item._id === itemId);
      if (!item) {
        console.error("Item not found");
        return;
      }

      const fetchedItem = await itemsService.getItemBySkuId(item.skuId);
      const updatedItem: QuotationItem = {
        ...item,
        name: fetchedItem.name,
        description: fetchedItem.description,
        unit: fetchedItem.unit,
        cost: fetchedItem.cost,
        price: fetchedItem.price,
        margin: fetchedItem.margin,
        total: fetchedItem.price * item.quantity,
        isEditing: true,
      };

      setQuotationItems((prevItems) =>
        prevItems.map((i) => (i._id === itemId ? updatedItem : i))
      );

      const updatedScopes = scopes.map((scope) => {
        if (scope.id === scope_id) {
          const updatedRooms = scope.rooms.map((room) => {
            if (room.id === room_id) {
              const updatedItems = room.items.map((i) =>
                i._id === itemId ? updatedItem : i
              );
              return { ...room, items: updatedItems };
            }
            return room;
          });
          return { ...scope, rooms: updatedRooms };
        }
        return scope;
      });
      setScopes(updatedScopes);
      console.log(`commit-item: `, quotationItems);
    } catch (error) {
      console.error("Error committing item:", error);
    }
    updateOverallQuotation();
  };

  const handleDeleteItem = (
    scope_id: string,
    room_id: string,
    itemId: string
  ) => {
    setQuotationItems((prevItems) =>
      prevItems.filter((item) => item._id !== itemId)
    );

    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scope_id) {
        const updatedRooms = scope.rooms.map((room) => {
          if (room.id === room_id) {
            const updatedItems = room.items.filter(
              (item) => item._id !== itemId
            );
            return { ...room, items: updatedItems };
          }
          return room;
        });
        return { ...scope, rooms: updatedRooms };
      }
      return scope;
    });
    setScopes(updatedScopes);
    updateOverallQuotation();
  };

  const handleSaveQuotation = async () => {
    try {
      const cleanedQuotationItems = quotationItems.map((item) => {
        const { _id, isEditing, ...cleanedItem } = item;
        return cleanedItem;
      });

      const quotationData = {
        quotation,
        quotationItems: cleanedQuotationItems,
      };
      console.log("onSaveQuotationData", quotationData);
      const newQuotation = await quotationsService.saveQuotation(quotationData);
      console.log("Quotation saved successfully:", newQuotation);
      return newQuotation;
    } catch (error) {
      console.error("Error saving quotation:", error);
    }
  };

  return (
    <Box
      p={"md"}
      style={{
        backgroundColor: theme.colors.primary[0],
        height: "95%",
        width: "95%",
        borderRadius: "15px",
        border: "1px solid rgba(158, 147, 110, 0.22)",
      }}
    >
      <Group justify="space-between" style={{ padding: "20px" }}>
        <Group>
          <ActionIcon
            variant="transparent"
            onClick={handleSaveQuotation}
            title="Save Quotation"
          >
            <CheckIcon size={18} />
          </ActionIcon>
          <Text fw={700} size="38px" mb="md">
            Draft Quote
          </Text>
        </Group>
        <Combobox
          store={scopeCombobox}
          width={250}
          position="bottom-start"
          withArrow
          withinPortal={false}
          onOptionSubmit={(val) => {
            console.log("onOptionSubmit ", val);
            handleAddScope(val);
          }}
        >
          <Combobox.Target>
            <Button
              onClick={() => scopeCombobox.toggleDropdown()}
              style={{
                backgroundColor: theme.colors.secondary[0],
                color: "black",
              }}
            >
              + Scope of Work
            </Button>
          </Combobox.Target>

          <Combobox.Dropdown>
            <Combobox.Options>
              {scopeOfWorkNames.map((option) => (
                <Combobox.Option value={option} key={option}>
                  {option}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
      </Group>
      <Box>
        <Stack spacing="md">
          {scopes.map((scope) => (
            <ScopeOfWork
              key={scope.id}
              scope={scope}
              onAddRoom={(selectedRoom) =>
                handleAddRoom(scope.id, selectedRoom)
              }
              onRemoveRoom={(room_id) => handleRemoveRoom(scope.id, room_id)}
              onAddItem={(room_id) => handleAddItem(scope.id, room_id)}
              onUpdateItem={(room_id, itemId, updates) =>
                handleUpdateItem(scope.id, room_id, itemId, updates)
              }
              onCommitItem={(room_id, itemId) =>
                handleCommitItem(scope.id, room_id, itemId)
              }
              onDeleteItem={(room_id, itemId) =>
                handleDeleteItem(scope.id, room_id, itemId)
              }
              onRemoveScope={() => handleRemoveScope(scope.id)}
              roomNames={roomNames}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default QuotationBuilder;
