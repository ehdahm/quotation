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
  Flex,
  Modal,
  TextInput,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import classes from "./BadgeCard.module.css";
import SavedQuotationsComponent from "./SavedQuotationsComponent";
import * as clientsService from "../services/clients";
import { useDisclosure } from "@mantine/hooks";

const ClientsPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>("Clients");
  const [opened, { open, close }] = useDisclosure(false);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    address: "",
  });
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

  const handleOpenModal = () => {
    open();
  };

  const handleAddClient = async () => {
    try {
      console.log(`adding a new client: ${newClient}`);
      const createdClient = await clientsService.createClient(newClient);
      setClients([...clients, createdClient]);
      close();
      setNewClient({ name: "", phone: "", address: "" });
    } catch (error) {
      console.error("Error adding client:", error);
      // You might want to show an error message to the user here
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
      </Flex>

      <Tabs.Panel value="Clients">
        <div>
          <Modal
            opened={opened}
            onClose={close}
            title="Add New Client"
            centered
          >
            <Stack>
              <TextInput
                label="Name"
                placeholder="Enter client name"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({ ...newClient, name: e.target.value })
                }
              />
              <TextInput
                label="Phone"
                placeholder="Enter phone number"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient({ ...newClient, phone: e.target.value })
                }
              />
              <TextInput
                label="Address"
                placeholder="Enter address"
                value={newClient.address}
                onChange={(e) =>
                  setNewClient({ ...newClient, address: e.target.value })
                }
              />
              <Button
                onClick={handleAddClient}
                style={{
                  backgroundColor: theme.colors.secondary[0],
                  color: "black",
                }}
              >
                Add Client
              </Button>
            </Stack>
          </Modal>
          <Button
            onClick={handleOpenModal}
            variant="transparent"
            fullWidth
            style={{ marginRight: "auto", color: "black" }}
          >
            + New
          </Button>
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
