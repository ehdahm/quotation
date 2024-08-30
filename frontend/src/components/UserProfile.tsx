import React from "react";
import { Box, Text, Button, Group, useMantineTheme } from "@mantine/core";
import { useAuth } from "../hooks/authProvider";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const theme = useMantineTheme();

  return (
    <Box
      mt={19}
      py={"12px"}
      style={{ backgroundColor: theme.colors.primary[0], borderRadius: "10px" }}
    >
      <Group position="apart">
        <Button
          ml={10}
          onClick={logout}
          style={{ backgroundColor: theme.colors.accent[0] }}
        >
          Logout
        </Button>
        <Text size="lg" fw={650}>
          Welcome, {user?.name || "User"}!
        </Text>
      </Group>
    </Box>
  );
};

export default UserProfile;
