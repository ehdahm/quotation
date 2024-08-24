import React from "react";
import { Grid } from "@mantine/core";
import ClientsPanel from "./ClientsPanel";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Grid style={{ height: "100vh" }}>
      <Grid.Col span={3} style={{ height: "100vh", overflowY: "auto" }}>
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
