import React from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  useMantineTheme,
  ActionIcon,
  useCombobox,
  Combobox,
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
  onAddRoom: (selectedRoom: string) => void;
  onRemoveRoom: (room_id: number) => void;
  onAddItem: (room_id: number) => void;
  onUpdateItem: (
    room_id: number,
    itemId: string,
    updates: Partial<QuotationItem>
  ) => void;
  onCommitItem: (room_id: number, itemId: string) => void;
  onCancelEdit: (room_id: number, itemId: string) => void;
  onRemoveScope: () => void;
  roomNames: string[];
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
  roomNames,
}) => {
  const theme = useMantineTheme();

  const roomCombobox = useCombobox({
    onDropdownClose: () => roomCombobox.resetSelectedOption(),
  });

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
          <Combobox
            store={roomCombobox}
            width={250}
            position="bottom-start"
            withArrow
            withinPortal={false}
            onOptionSubmit={(val) => {
              onAddRoom(val);
            }}
          >
            <Combobox.Target>
              <Button
                onClick={() => roomCombobox.toggleDropdown()}
                style={{
                  backgroundColor: theme.colors.primary[0],
                  color: "black",
                }}
              >
                + Room
              </Button>
            </Combobox.Target>

            <Combobox.Dropdown>
              <Combobox.Options>
                {roomNames.map((option) => (
                  <Combobox.Option value={option} key={option}>
                    {option}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox.Dropdown>
          </Combobox>
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
