import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Text,
  Stack,
  Group,
  Tabs,
  useMantineTheme,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import classes from "./BadgeCard.module.css";
import SavedQuotationsComponent from "./SavedQuotationsComponent";
import * as clientsService from "../services/clients";

const ClientsPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await clientsService.getClients();
      setClients(clients);
    };
    fetchClients();
  }, []);

  useEffect(() => {
    if (clients.length > 0) {
      console.log(clients);
    }
  }, [clients]);

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
              <Box style={{ flexGrow: 1, maxWidth: "60%" }}>
                {" "}
                <SavedQuotationsComponent clientId={client._id} />{" "}
              </Box>
            </Card>
          ))}
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="Items">{/* Content for Items tab */}</Tabs.Panel>
    </Tabs>
  );
};

export default ClientsPanel;
