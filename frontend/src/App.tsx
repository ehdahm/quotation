import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuotationBuilder from "./pages/QuotationBuilder";
import ClientsPanel from "./components/ClientsPanel";

const theme = createTheme({
  colorScheme: "light",
});

function App() {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quotation/:clientId" element={<QuotationBuilder />} />
          </Routes>
        </Layout>
      </Router>
    </MantineProvider>
  );
}

export default App;
