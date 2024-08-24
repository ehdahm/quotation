import React, { useEffect, useState } from "react";
import { Card, Button, Text, Stack, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Client } from "../types";

import { Tabs } from "@mantine/core";

const ClientsPanel = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const navigate = useNavigate();

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
    <Tabs defaultValue="first">
      <Tabs.List grow justify="space-between">
        <Tabs.Tab value="Clients">Clients</Tabs.Tab>
        <Tabs.Tab value="second">Items</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="Clients"></Tabs.Panel>
      <div>
        {clients.map((client) => (
          <Card key={client._id} shadow="sm" padding="xl">
            <Group grow>
              <Stack gap={"l"}>
                <Text size="20px" fw={500}>
                  {client.name}
                </Text>
                <Text size="sm">{client.phone}</Text>
                <Text size="sm">{client.address}</Text>
              </Stack>
              <Button
                size="sm"
                onClick={() => handleGenerateQuotation(client._id)}
              >
                Create Quotation
              </Button>
            </Group>
          </Card>
        ))}
      </div>
    </Tabs>
  );
};

export default ClientsPanel;
