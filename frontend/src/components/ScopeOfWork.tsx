import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  useMantineTheme,
  ActionIcon,
} from "@mantine/core";
import Room from "./Room";
import { QuotationItem } from "../types";
import { IconX } from "@tabler/icons-react";

interface ScopeOfWorkProps {
  scope: {
    id: number;
    title: string;
    rooms: {
      id: number;
      name: string;
      items: QuotationItem[];
    }[];
  };
  onAddRoom: () => void;
  onRemoveRoom: (roomId: number) => void;
  onAddItem: (roomId: number) => void;
  onUpdateItem: (
    roomId: number,
    itemId: string,
    updates: Partial<QuotationItem>
  ) => void;
  onCommitItem: (roomId: number, itemId: string) => void;
  onCancelEdit: (roomId: number, itemId: string) => void;
  onRemoveScope: () => void;
}

const ScopeOfWork: React.FC<ScopeOfWorkProps> = ({
  scope,
  onAddRoom,
  onRemoveRoom,
  onAddItem,
  onUpdateItem,
  onCommitItem,
  onCancelEdit,
  onRemoveScope,
}) => {
  const theme = useMantineTheme();

  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: theme.colors.secondary[0],
          color: "black",
          borderRadius: "10px",
          position: "relative",
        }}
      >
        <ActionIcon
          color="red"
          variant="transparent"
          onClick={onRemoveScope}
          title="Remove Scope of Work"
          style={{ position: "absolute", left: "10px" }}
        >
          <IconX size={18} />
        </ActionIcon>
        <Text
          fw={600}
          tt="uppercase"
          style={{
            fontSize: "18px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {scope.title}
        </Text>
        <div style={{ marginLeft: "auto" }}>
          <Button
            onClick={onAddRoom}
            style={{
              backgroundColor: theme.colors.primary[0],
              color: "black",
            }}
          >
            + Room
          </Button>
        </div>
      </Flex>
      <Stack spacing="xs" mt="sm">
        {scope.rooms.map((room) => (
          <Room
            key={room.id}
            room={room}
            onRemoveRoom={() => onRemoveRoom(room.id)}
            onAddItem={() => onAddItem(room.id)}
            onUpdateItem={(itemId, updates) =>
              onUpdateItem(room.id, itemId, updates)
            }
            onCommitItem={(itemId) => onCommitItem(room.id, itemId)}
            onCancelEdit={(itemId) => onCancelEdit(room.id, itemId)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ScopeOfWork;
