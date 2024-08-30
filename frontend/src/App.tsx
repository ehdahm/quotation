import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuotationBuilder from "./pages/QuotationBuilder";
import { AuthenticationForm } from "./pages/AuthenticationPage";
import { useAuth } from "./hooks/useAuth";

// Create a custom theme
const theme = createTheme({
  colorScheme: "light",
  colors: {
    background: ["#f2f1ea"], // Add more shades if needed
    primary: ["#f7f7f4"], // For quotation pages and badge cards
    secondary: ["#e3dfd0"], // For tabs or nav bars
  },
  components: {
    Body: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.background[0],
        },
      }),
    },
  },
});

function App() {
  const isLoggedIn = useAuth();

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthenticationForm />} />
            <Route
              path="/quotation/new/:clientId"
              element={<QuotationBuilder />}
            />
            <Route
              path="/quotation/edit/:quotationId"
              element={<QuotationBuilder />}
            />
          </Routes>
        </Layout>
      </Router>
    </MantineProvider>
  );
}

export default App;
