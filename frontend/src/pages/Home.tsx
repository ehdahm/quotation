import React from "react";
import { Text, Box, Stack } from "@mantine/core";

const Home: React.FC = () => {
  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("/images.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(5px)",
          zIndex: -2,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: -1,
        },
      })}
    >
      <Stack
        justify="center"
        align="center"
        style={{ height: "100%", position: "relative", zIndex: 1 }}
      >
        <Text size="40px" weight={1200} color="black">
          Welcome to Your Quotation Portal
        </Text>
      </Stack>
    </Box>
  );
};

export default Home;
