import React from "react";
import { Box, Button, Flex, Text, Table } from "@mantine/core";
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
  return (
    <Box>
      <Flex
        align="center"
        justify="space-between"
        style={{ width: "100%", padding: "5px", backgroundColor: "#e0e0e0" }}
      >
        <Text>{room.name}</Text>
        <Button size="sm" onClick={onAddItem}>
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
