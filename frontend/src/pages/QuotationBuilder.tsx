import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Text,
  Button,
  Box,
  Stack,
  useMantineTheme,
  Group,
  CheckIcon,
  Combobox,
  useCombobox,
} from "@mantine/core";
import { Client, QuotationItem } from "../types";
import ScopeOfWork from "../components/ScopeOfWork";
import * as itemsService from "../services/items";
import * as scopeOfWorksService from "../services/scopeOfWorks";
import * as roomsService from "../services/rooms";

interface Scope {
  id: number;
  title: string;
  rooms: Room[];
}

interface Room {
  id: number;
  name: string;
  items: QuotationItem[];
}

const QuotationBuilder: React.FC = () => {
  const theme = useMantineTheme();
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [nextScopeId, setNextScopeId] = useState(1);
  const [nextRoomId, setNextRoomId] = useState(1);
  const [nextItemId, setNextItemId] = useState(1);
  const [roomOptions, setRoomOptions] = useState<string[]>([]);
  const [scopeOfWorkOptions, setScopeOfWorkOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchScopeOfWorkOptions = async () => {
      try {
        const scopeOfWorks = await scopeOfWorksService.getScopeOfWorks();
        const scopeOFWorkNames = scopeOfWorks.map((scope) => scope.name);
        setScopeOfWorkOptions(scopeOFWorkNames);
      } catch (error) {
        console.error("Error fetching scope of work options", error);
      }
    };

    const fetchRoomOptions = async () => {
      try {
        const rooms = await roomsService.getRooms();
        const roomNames = rooms.map((room) => room.name);
        setRoomOptions(roomNames);
      } catch (error) {
        console.error("Error fetching room options.", error);
      }
    };

    fetchScopeOfWorkOptions();
    fetchRoomOptions();
  }, []);

  console.log(scopeOfWorkOptions, roomOptions);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const handleAddScope = (selectedScope: string) => {
    const newScope: Scope = {
      id: nextScopeId,
      title: selectedScope,
      rooms: [],
    };
    setScopes([...scopes, newScope]);
    setNextScopeId(nextScopeId + 1);
  };

  const handleRemoveScope = (scopeId: number) => {
    setScopes(scopes.filter((scope) => scope.id !== scopeId));
  };

  const handleAddRoom = (scopeId: number) => {
    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scopeId) {
        const newRoom: Room = {
          id: nextRoomId,
          name: `Room ${nextRoomId}`,
          items: [],
        };
        return { ...scope, rooms: [...scope.rooms, newRoom] };
      }
      return scope;
    });
    setScopes(updatedScopes);
    setNextRoomId(nextRoomId + 1);
  };

  const handleRemoveRoom = (scopeId: number, roomId: number) => {
    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scopeId) {
        return {
          ...scope,
          rooms: scope.rooms.filter((room) => room.id !== roomId),
        };
      }
      return scope;
    });
    setScopes(updatedScopes);
  };

  const handleAddItem = (scopeId: number, roomId: number) => {
    const newItem: QuotationItem = {
      _id: `item-${nextItemId}`,
      skuId: "",
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
    setNextItemId(nextItemId + 1);

    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scopeId) {
        const updatedRooms = scope.rooms.map((room) => {
          if (room.id === roomId) {
            return { ...room, items: [...room.items, newItem] };
          }
          return room;
        });
        return { ...scope, rooms: updatedRooms };
      }
      return scope;
    });
    setScopes(updatedScopes);
  };

  const handleUpdateItem = (
    scopeId: number,
    roomId: number,
    itemId: string,
    updates: Partial<QuotationItem>
  ) => {
    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scopeId) {
        const updatedRooms = scope.rooms.map((room) => {
          if (room.id === roomId) {
            const updatedItems = room.items.map((item) => {
              if (item._id === itemId) {
                return { ...item, ...updates };
              }
              return item;
            });
            return { ...room, items: updatedItems };
          }
          return room;
        });
        return { ...scope, rooms: updatedRooms };
      }
      return scope;
    });
    setScopes(updatedScopes);
  };

  const handleCommitItem = async (
    scopeId: number,
    roomId: number,
    itemId: string
  ) => {
    try {
      const updatedScopes = await Promise.all(
        scopes.map(async (scope) => {
          if (scope.id === scopeId) {
            const updatedRooms = await Promise.all(
              scope.rooms.map(async (room) => {
                if (room.id === roomId) {
                  const updatedItems = await Promise.all(
                    room.items.map(async (item) => {
                      if (item._id === itemId) {
                        try {
                          const fetchedItem = await itemsService.getItemBySkuId(
                            item.skuId
                          );
                          return {
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
                        } catch (error) {
                          console.error("Error fetching item:", error);
                          // error will keep existing item data
                          return item;
                        }
                      }
                      return item;
                    })
                  );
                  return { ...room, items: updatedItems };
                }
                return room;
              })
            );
            return { ...scope, rooms: updatedRooms };
          }
          return scope;
        })
      );
      setScopes(updatedScopes);
    } catch (error) {
      console.error("Error updating scopes:", error);
    }
  };

  const handleCancelEdit = (
    scopeId: number,
    roomId: number,
    itemId: string
  ) => {
    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scopeId) {
        const updatedRooms = scope.rooms.map((room) => {
          if (room.id === roomId) {
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
        <Text fw={700} size="38px" mb="md">
          Draft Quote
        </Text>
        <Button
          onClick={handleAddScope}
          mb="md"
          style={{ backgroundColor: theme.colors.secondary[0], color: "black" }}
        >
          + Scope of Work
        </Button>
      </Group>
      <Box>
        <Stack spacing="md">
          {scopes.map((scope) => (
            <ScopeOfWork
              key={scope.id}
              scope={scope}
              onAddRoom={() => handleAddRoom(scope.id)}
              onRemoveRoom={(roomId) => handleRemoveRoom(scope.id, roomId)}
              onAddItem={(roomId) => handleAddItem(scope.id, roomId)}
              onUpdateItem={(roomId, itemId, updates) =>
                handleUpdateItem(scope.id, roomId, itemId, updates)
              }
              onCommitItem={(roomId, itemId) =>
                handleCommitItem(scope.id, roomId, itemId)
              }
              onCancelEdit={(roomId, itemId) =>
                handleCancelEdit(scope.id, roomId, itemId)
              }
              onRemoveScope={() => handleRemoveScope(scope.id)}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default QuotationBuilder;
