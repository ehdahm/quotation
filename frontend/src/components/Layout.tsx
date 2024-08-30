import React from "react";
import { Grid } from "@mantine/core";
import ClientsPanel from "./ClientsPanel";
import { useAuth } from "../hooks/AuthProvider";
import UserProfile from "./UserProfile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Grid style={{ height: "100vh", marginLeft: "16px" }}>
      <Grid.Col span={3} style={{ height: "100vh", overflowY: "auto" }}>
        <UserProfile />
        <ClientsPanel />
      </Grid.Col>
      <Grid.Col
        span={9}
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Grid.Col>
    </Grid>
  );
};

export default Layout;
