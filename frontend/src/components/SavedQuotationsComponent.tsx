import React, { useEffect, useState } from "react";
import { Box, Button, Group, Text, Loader } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import * as quotationsService from "../services/quotations";

interface Quotation {
  _id: string;
  total_amount: number;
  createdAt: string;
}

interface SavedQuotationsComponentProps {
  clientId: string;
}

const SavedQuotationsComponent: React.FC<SavedQuotationsComponentProps> = ({
  clientId,
}) => {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        setIsLoading(true);
        console.log("clientIdInCard", clientId);
        const fetchedQuotations =
          await quotationsService.getQuotationsByClientId(clientId);
        setQuotations(fetchedQuotations);
      } catch (err) {
        setError("Failed to fetch quotations");
        console.error("Error fetching quotations:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuotations();
  }, [clientId]);

  const handleEditQuotation = (quotationId: string) => {
    navigate(`/quotation/edit/${quotationId}`);
  };

  if (isLoading) {
    return <Loader size="sm" />;
  }

  if (error) {
    return (
      <Text color="red" size="sm">
        {error}
      </Text>
    );
  }

  if (quotations.length === 0) {
    return <Text size="sm">No saved quotations</Text>;
  }

  return (
    <Box style={{ marginTop: "20px" }}>
      <Group spacing="xs">
        {quotations.map((quotation) => (
          <Button
            key={quotation._id}
            onClick={() => handleEditQuotation(quotation._id)}
            variant="outline"
            size="xs"
            style={{ padding: "4px 8px" }}
          >
            ${quotation.total_amount.toFixed(2)} -{" "}
            {new Date(quotation.createdAt).toLocaleDateString()}
          </Button>
        ))}
      </Group>
    </Box>
  );
};

export default SavedQuotationsComponent;
