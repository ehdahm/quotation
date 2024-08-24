import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Text,
  Button,
  Box,
  Stack,
  useMantineTheme,
  Group,
  Divider,
} from "@mantine/core";
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
  const theme = useMantineTheme();
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

  const workScopes = scopes.map((scope) => (
    <ScopeOfWork
      key={scope.id}
      scope={scope}
      onAddRoom={() => handleAddRoom(scope.id)}
      onAddItem={(roomId) => handleAddItem(scope.id, roomId)}
    />
  ));

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
        <Stack spacing="md">{workScopes}</Stack>
      </Box>
    </Box>
  );
};

export default QuotationBuilder;
