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
  Modal,
  TextInput,
  ActionIcon,
  Menu,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";
import classes from "./BadgeCard.module.css";
import SavedQuotationsComponent from "./SavedQuotationsComponent";
import * as clientsService from "../services/clients";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDots,
  IconEdit,
  IconScriptPlus,
  IconTrash,
} from "@tabler/icons-react";

const ClientsPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>("Clients");
  const [newClientOpened, { open: openNewClient, close: closeNewClient }] =
    useDisclosure(false);
  const [editClientOpened, { open: openEditClient, close: closeEditClient }] =
    useDisclosure(false);
  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [editingClient, setEditingClient] = useState<Client | null>(null);
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

  const handleGenerateQuotation = (clientId: string) => {
    navigate(`/quotation/new/${clientId}`);
  };

  const handleOpenNewClientModal = () => {
    openNewClient();
  };

  const handleAddClient = async () => {
    try {
      console.log(`adding a new client: ${newClient}`);
      const createdClient = await clientsService.createClient(newClient);
      setClients([...clients, createdClient]);
      closeNewClient();
      setNewClient({ name: "", phone: "", address: "" });
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  const handleEditClient = (client: Client) => {
    setEditingClient({ ...client });
    openEditClient();
  };

  const handleUpdateClient = async () => {
    if (!editingClient) return;
    try {
      const updatedClient = await clientsService.updateClient(
        editingClient._id,
        editingClient
      );
      setClients(
        clients.map((c) => (c._id === updatedClient._id ? updatedClient : c))
      );
      closeEditClient();
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  const handleEditInputChange = (field: keyof Client, value: string) => {
    setEditingClient((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleDeleteClient = async (clientId: string) => {
    try {
      await clientsService.deleteClient(clientId);
      setClients(clients.filter((c) => c._id !== clientId));
    } catch (error) {
      console.error("Error deleting client:", error);
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
      <Tabs.List grow justify="space-between">
        <Tabs.Tab
          value="Clients"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: theme.colors.secondary[0],
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
            backgroundColor: theme.colors.secondary[0],
          }}
        >
          Items
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Clients">
        <div>
          <Modal
            opened={newClientOpened}
            onClose={closeNewClient}
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

          <Modal
            opened={editClientOpened}
            onClose={closeEditClient}
            title="Edit Client"
            centered
          >
            <Stack>
              <TextInput
                label="Name"
                value={editingClient?.name || ""}
                onChange={(e) => handleEditInputChange("name", e.target.value)}
              />
              <TextInput
                label="Phone"
                value={editingClient?.phone || ""}
                onChange={(e) => handleEditInputChange("phone", e.target.value)}
              />
              <TextInput
                label="Address"
                value={editingClient?.address || ""}
                onChange={(e) =>
                  handleEditInputChange("address", e.target.value)
                }
              />
              <Button
                onClick={handleUpdateClient}
                style={{
                  backgroundColor: theme.colors.secondary[0],
                  color: "black",
                }}
              >
                Update Client
              </Button>
            </Stack>
          </Modal>

          <Button
            onClick={handleOpenNewClientModal}
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
              padding="lg"
              className={classes.card}
              style={{
                backgroundColor: theme.colors.primary[0],
                position: "relative",
              }}
            >
              <Group>
                <Stack gap="md" style={{ flexGrow: 1 }}>
                  <Text size="20px" fw={500} className={classes.label}>
                    {client.name}
                  </Text>
                  <Text size="sm">{client.phone}</Text>
                  <Text size="sm">{client.address}</Text>
                </Stack>
                <Stack>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon
                        variant="transparent"
                        style={{ position: "absolute", top: 8, right: 8 }}
                      >
                        <IconDots style={{ color: "black" }} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEdit size={14} />}
                        onClick={() => handleEditClient(client)}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconTrash size={14} />}
                        onClick={() => handleDeleteClient(client._id)}
                        color="red"
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                  <ActionIcon
                    variant="transparent"
                    onClick={() => handleGenerateQuotation(client._id)}
                    style={{
                      flexGrow: 0,
                      backgroundColor: theme.colors.secondary[0],
                      color: "black",
                      position: "absolute",
                      top: 70,
                      right: 8,
                    }}
                  >
                    <IconScriptPlus size={"10rem"} />
                  </ActionIcon>
                </Stack>
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
