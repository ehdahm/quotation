import React from "react";
import { Box, Text, Table, useMantineTheme, Group, Flex } from "@mantine/core";
import { Scope } from "../types";

interface ProjectSummaryProps {
  scopes: Scope[];
  totalProjectCost: number;
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
  scopes,
  totalProjectCost,
}) => {
  const theme = useMantineTheme();

  const calculateScopeTotal = (scope: Scope) => {
    return scope.rooms.reduce((total, room) => {
      return (
        total +
        room.items.reduce((roomTotal, item) => roomTotal + item.total, 0)
      );
    }, 0);
  };

  return (
    <Box mt={100} mb={20} style={{ width: "100%" }}>
      <Box
        p="sm"
        style={{
          backgroundColor: theme.colors.secondary[0],
          borderRadius: theme.radius.md,
        }}
      >
        <Flex
          align="center"
          justify="center"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: theme.colors.secondary[0],
            color: "black",
            borderRadius: "10px",
          }}
        >
          <Text
            fw={600}
            tt="uppercase"
            style={{
              fontSize: "18px",
            }}
          >
            PROJECT SUMMARY
          </Text>
        </Flex>
      </Box>

      <Table mt="md" style={{ backgroundColor: theme.colors.gray[0] }}>
        <Table.Tbody>
          {scopes.map((scope) => (
            <Table.Tr key={scope.id}>
              <Table.Td>{scope.title}</Table.Td>
              <Table.Td style={{ textAlign: "right" }}>
                ${calculateScopeTotal(scope).toFixed(2)}
              </Table.Td>
            </Table.Tr>
          ))}
          <Table.Tr style={{ fontWeight: "bold" }}>
            <Table.Td>Total Project Cost</Table.Td>
            <Table.Td style={{ textAlign: "right" }}>
              ${totalProjectCost.toFixed(2)}
            </Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </Box>
  );
};

export default ProjectSummary;
