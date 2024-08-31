import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuotationBuilder from "./pages/QuotationBuilder";
import { AuthenticationForm } from "./pages/AuthenticationPage";
import { AuthProvider, useAuth } from "./hooks/AuthProvider";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

// Create a custom theme
const theme = createTheme({
  colorScheme: "light",
  colors: {
    background: ["#f2f1ea"], // Add more shades if needed
    primary: ["#f7f7f4"], // For quotation pages and badge cards
    secondary: ["#e3dfd0"], // For tabs or nav bars
    accent: ["#c05f3c"],
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
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          !isAuthenticated ? <AuthenticationForm /> : <Navigate to="/" />
        }
      />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
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
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  console.log(`app component rendering`);
  return (
    <AuthProvider>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        {/* <Notifications> */}
        <Router>
          <AppContent />
        </Router>
        {/* </Notifications> */}
      </MantineProvider>
    </AuthProvider>
  );
}

export default App;
