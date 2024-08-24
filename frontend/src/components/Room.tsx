import React from "react";
import { Box, Button, Flex, Text, Table, useMantineTheme } from "@mantine/core";
import { QuotationItem } from "../types";

interface RoomProps {
  room: {
    id: number;
    name: string;
    items: QuotationItem[];
  };
  onAddItem: () => void;
}

const Room: React.FC<RoomProps> = ({ room, onAddItem }) => {
  const theme = useMantineTheme();

  return (
    <Box style={{ paddingInline: "24px" }}>
      <Flex
        align="center"
        justify="space-between"
        style={{
          width: "100%",
          padding: "5px",
          backgroundColor: theme.colors.primary[0],
        }}
      >
        <Text fw={500} size="18px">
          {room.name}
        </Text>
        <Button
          size="sm"
          onClick={onAddItem}
          style={{ backgroundColor: theme.colors.secondary[0], color: "black" }}
        >
          Add Item
        </Button>
      </Flex>
      {room.items.length > 0 && (
        <Table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {room.items.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Box>
  );
};

export default Room;
