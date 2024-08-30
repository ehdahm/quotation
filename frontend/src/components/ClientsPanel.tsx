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
  ActionIcon,
  Flex,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import classes from "./BadgeCard.module.css";
import SavedQuotationsComponent from "./SavedQuotationsComponent";
import * as clientsService from "../services/clients";
import { IconPlus } from "@tabler/icons-react";

const ClientsPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>("Clients");
  const navigate = useNavigate();
  const theme = useMantineTheme();

  useEffect(() => {
    const fetchClients = async () => {
      const clients = await clientsService.getClients();
      console.log("Fetching clients in Clients Panel", clients);
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
    navigate(`/quotation/new/${clientId}`);
  };

  const handleAddNew = () => {
    if (activeTab === "Clients") {
      console.log(`processing add new for ${activeTab}`);
    }
    if (activeTab === "Items") {
      console.log(`processing add new for ${activeTab}`);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    console.log(`Active tab is now: ${value}`);
  };

  return (
    <Tabs
      defaultValue="Clients"
      value={activeTab}
      onChange={handleTabChange}
      style={{ backgroundColor: theme.colors.background[0] }}
    >
      <Flex
        align="center"
        style={{
          backgroundColor: theme.colors.secondary[0],
          height: "40px",
          justifyContent: "space-between",
        }}
      >
        <Flex style={{ flexGrow: 1 }}>
          <Tabs.List style={{ display: "flex", width: "50%" }}>
            <Tabs.Tab
              value="Clients"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Clients
            </Tabs.Tab>
            <Tabs.Tab
              value="Items"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Items
            </Tabs.Tab>
          </Tabs.List>
        </Flex>
        <ActionIcon
          variant="filled"
          color={theme.colors.secondary[0]}
          onClick={handleAddNew()}
          title="Add Client"
          style={{ marginRight: "15px" }}
        >
          <IconPlus color="black" size={18} />
        </ActionIcon>
      </Flex>

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
                <SavedQuotationsComponent clientId={client._id} />
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
