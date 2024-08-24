import React from "react";
import { Box, Button, Flex, Text, Stack, useMantineTheme } from "@mantine/core";
import Room from "./Room";

interface ScopeOfWorkProps {
  scope: {
    id: number;
    title: string;
    rooms: {
      id: number;
      name: string;
      items: any[];
    }[];
  };
  onAddRoomlessItem: () => void;
  onAddRoom: () => void;
  onAddItem: (roomId: number) => void;
}

const ScopeOfWork: React.FC<ScopeOfWorkProps> = ({
  scope,
  onAddRoomlessItem,
  onAddRoom,
  onAddItem,
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
          {" "}
          {/* Push button to the right */}
          <Button
            onClick={onAddRoomlessItem}
            style={{
              backgroundColor: theme.colors.primary[0],
              color: "black",
              marginRight: "8px",
            }}
          >
            + Item
          </Button>
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
            onAddItem={() => onAddItem(room.id)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default ScopeOfWork;
