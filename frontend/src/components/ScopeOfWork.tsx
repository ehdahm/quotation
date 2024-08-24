import React from "react";
import { Box, Button, Flex, Text, Stack } from "@mantine/core";
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
  onAddRoom: () => void;
  onAddItem: (roomId: number) => void;
}

const ScopeOfWork: React.FC<ScopeOfWorkProps> = ({
  scope,
  onAddRoom,
  onAddItem,
}) => {
  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        style={{ width: "100%", padding: "10px", backgroundColor: "#f0f0f0" }}
      >
        <Text fw={500}>{scope.title}</Text>
        <Button onClick={onAddRoom}>Add Room</Button>
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
