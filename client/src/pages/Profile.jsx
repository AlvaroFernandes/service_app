import React from "react";
import MenuLayout from "../components/Menu";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Toolbar } from "@mui/material";

const mdTheme = createTheme();

function DashboardContent() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuLayout title={"Profile"} />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
