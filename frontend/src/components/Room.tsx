import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Table,
  TextInput,
  NumberInput,
  ActionIcon,
  useMantineTheme,
  Textarea,
  Group,
} from "@mantine/core";
import { QuotationItem } from "../types";
import { IconSearch, IconX } from "@tabler/icons-react";

interface RoomProps {
  room: {
    id: number;
    name: string;
    items: QuotationItem[];
  };
  onRemoveRoom: () => void;
  onAddItem: () => void;
  onUpdateItem: (itemId: string, updates: Partial<QuotationItem>) => void;
  onCommitItem: (itemId: string) => void;
  onCancelEdit: (itemId: string) => void;
}

const Room: React.FC<RoomProps> = ({
  room,
  onRemoveRoom,
  onAddItem,
  onUpdateItem,
  onCommitItem,
  onCancelEdit,
}) => {
  const theme = useMantineTheme();

  const handleInputChange = (
    itemId: string,
    field: keyof QuotationItem,
    value: string | number
  ) => {
    const item = room.items.find((i) => i._id === itemId);
    if (!item) return;

    const updates: Partial<QuotationItem> = { [field]: value };

    if (field === "quantity") {
      updates.total = item.price * Number(value);
    } else if (field === "price") {
      updates.margin = ((Number(value) - item.cost) / Number(value)) * 100;
      updates.total = Number(value) * item.quantity;
    } else if (field === "margin") {
      const newPrice = item.cost / (1 - Number(value) / 100);
      updates.price = newPrice;
      updates.total = newPrice * item.quantity;
    }

    onUpdateItem(itemId, updates);
  };

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
        <Group spacing="xs">
          <ActionIcon
            variant="transparent"
            color="red"
            onClick={onRemoveRoom}
            title="Remove Room"
          >
            <IconX size={18} />
          </ActionIcon>
          <Text fw={500} size="18px">
            {room.name}
          </Text>
        </Group>
        <Button
          size="sm"
          onClick={onAddItem}
          style={{
            backgroundColor: theme.colors.secondary[0],
            color: "black",
          }}
        >
          Add Item
        </Button>
      </Flex>
      <Table style={{ tableLayout: "fixed" }}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "150px" }}>SKU ID</Table.Th>
            <Table.Th style={{ width: "20%" }}>Item</Table.Th>
            <Table.Th style={{ width: "30%" }}>Description</Table.Th>
            <Table.Th style={{ width: "80px" }}>Quantity</Table.Th>
            <Table.Th style={{ width: "60px" }}>Unit</Table.Th>
            <Table.Th style={{ width: "100px" }}>Cost ($)</Table.Th>
            <Table.Th style={{ width: "100px" }}>Price ($)</Table.Th>
            <Table.Th style={{ width: "100px" }}>Margin (%)</Table.Th>
            <Table.Th style={{ width: "100px" }}>Total ($)</Table.Th>
            <Table.Th style={{ width: "60px" }}></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {room.items.map((item) => (
            <Table.Tr key={item._id}>
              <Table.Td>
                <Group>
                  <TextInput
                    style={{ width: "150px" }}
                    value={item.skuId}
                    onChange={(e) =>
                      handleInputChange(item._id, "skuId", e.target.value)
                    }
                    disabled={!item.isEditing}
                    rightSection={
                      <ActionIcon
                        variant="transparent"
                        onClick={() => onCommitItem(item._id)}
                        color="grey"
                      >
                        <IconSearch size="1.125rem" />
                      </ActionIcon>
                    }
                  />
                </Group>
              </Table.Td>
              <Table.Td>
                <Textarea
                  value={item.name}
                  onChange={(e) =>
                    handleInputChange(item._id, "name", e.target.value)
                  }
                  disabled={!item.isEditing}
                  autosize
                  minRows={1}
                  maxRows={5}
                />
              </Table.Td>
              <Table.Td>
                <Textarea
                  value={item.description}
                  onChange={(e) =>
                    handleInputChange(item._id, "description", e.target.value)
                  }
                  disabled={!item.isEditing}
                  autosize
                  minRows={1}
                  maxRows={5}
                />
              </Table.Td>
              <Table.Td>
                <NumberInput
                  value={item.quantity}
                  onChange={(value) =>
                    handleInputChange(item._id, "quantity", value)
                  }
                  disabled={!item.isEditing}
                  min={1}
                  style={{ width: "70px" }}
                />
              </Table.Td>
              <Table.Td>{item.unit}</Table.Td>
              <Table.Td>{item.cost.toFixed(2)}</Table.Td>
              <Table.Td>
                <NumberInput
                  hideControls
                  value={item.price}
                  onChange={(value) =>
                    handleInputChange(item._id, "price", value)
                  }
                  disabled={!item.isEditing}
                  precision={2}
                  style={{ width: "90px" }}
                />
              </Table.Td>
              <Table.Td>{item.margin.toFixed(2)}</Table.Td>
              <Table.Td>{item.total.toFixed(2)}</Table.Td>
              <Table.Td>
                {item.isEditing ? (
                  <ActionIcon
                    variant="transparent"
                    onClick={() => onCancelEdit(item._id)}
                    color="red"
                  >
                    <IconX size="1.125rem" />
                  </ActionIcon>
                ) : (
                  <ActionIcon
                    variant="transparent"
                    onClick={() => onCommitItem(item._id)}
                    disabled={!item.skuId}
                    color="blue"
                  >
                    <IconSearch size="1.125rem" />
                  </ActionIcon>
                )}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default Room;
