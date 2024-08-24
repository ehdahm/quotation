import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Button, Box, Stack } from "@mantine/core";
import { Client, QuotationItem } from "../types";
import ScopeOfWork from "../components/ScopeOfWork";
import Room from "../components/Room";

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
  const { clientId } = useParams<{ clientId: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [nextScopeId, setNextScopeId] = useState(1);
  const [nextRoomId, setNextRoomId] = useState(1);
  const [nextItemId, setNextItemId] = useState(1);

  const handleAddScope = () => {
    const newScope: Scope = {
      id: nextScopeId,
      title: `Scope of Work ${nextScopeId}`,
      rooms: [],
    };
    setScopes([...scopes, newScope]);
    setNextScopeId(nextScopeId + 1);
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

  const handleAddItem = (scopeId: number, roomId: number) => {
    const updatedScopes = scopes.map((scope) => {
      if (scope.id === scopeId) {
        const updatedRooms = scope.rooms.map((room) => {
          if (room.id === roomId) {
            const newItem: QuotationItem = {
              _id: `item-${nextItemId}`,
              name: `Item ${nextItemId}`,
              room: room.name,
              quantity: 1,
              price: 0,
            };
            return { ...room, items: [...room.items, newItem] };
          }
          return room;
        });
        return { ...scope, rooms: updatedRooms };
      }
      return scope;
    });
    setScopes(updatedScopes);
    setNextItemId(nextItemId + 1);
  };

  return (
    <Box style={{ height: "100vh", width: "100vw" }} p="md">
      <Text fw={700} size="30px" mb="md">
        Draft Quote
      </Text>
      <Button onClick={handleAddScope} mb="md">
        New Scope of Work
      </Button>
      <Stack spacing="md">
        {scopes.map((scope) => (
          <ScopeOfWork
            key={scope.id}
            scope={scope}
            onAddRoom={() => handleAddRoom(scope.id)}
            onAddItem={(roomId) => handleAddItem(scope.id, roomId)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default QuotationBuilder;
