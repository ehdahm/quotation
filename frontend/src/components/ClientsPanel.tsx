import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Text,
  Stack,
  Group,
  Tabs,
  useMantineTheme,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import classes from "./BadgeCard.module.css";

const ClientsPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();
  const theme = useMantineTheme();

  useEffect(() => {
    // Hardcoded fake data
    const fakeClients: Client[] = [
      {
        _id: "1",
        name: "John Doe",
        phone: "+1 (555) 123-4567",
        address: "123 Elm Street, Springfield, USA",
      },
      {
        _id: "2",
        name: "Jane Smith",
        phone: "+1 (555) 987-6543",
        address: "456 Oak Avenue, Metropolis, USA",
      },
      {
        _id: "3",
        name: "Alice Johnson",
        phone: "+1 (555) 555-5555",
        address: "789 Maple Lane, Gotham, USA",
      },
    ];

    setClients(fakeClients);
  }, []);

  const handleGenerateQuotation = (clientId: string) => {
    navigate(`/quotation/${clientId}`);
  };

  return (
    <Tabs
      defaultValue="Clients"
      style={{ backgroundColor: theme.colors.background[0] }}
    >
      <Tabs.List
        grow
        justify="space-between"
        style={{ backgroundColor: theme.colors.secondary[0] }}
      >
        <Tabs.Tab value="Clients">Clients</Tabs.Tab>
        <Tabs.Tab value="Items">Items</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Clients">
        <div>
          {clients.map((client) => (
            <Card
              key={client._id}
              shadow="sm"
              padding="xl"
              className={classes.card}
              style={{ backgroundColor: theme.colors.primary[0] }}
            >
              <Group>
                <Stack gap="md" style={{ flexGrow: 1 }}>
                  <Text size="20px" fw={500} className={classes.label}>
                    {client.name}
                  </Text>
                  <Text size="sm">{client.phone}</Text>
                  <Text size="sm">{client.address}</Text>
                </Stack>
                <Button
                  onClick={() => handleGenerateQuotation(client._id)}
                  style={{
                    flexGrow: 0,
                    backgroundColor: theme.colors.secondary[0],
                    color: "black",
                  }}
                >
                  Create Quotation
                </Button>
              </Group>
            </Card>
          ))}
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="Items">{/* Content for Items tab */}</Tabs.Panel>
    </Tabs>
  );
};

export default ClientsPanel;
