import React from "react";
import MenuLayout from "../components/Menu";
import UserForm from "../components/UserForm";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Paper, Toolbar } from "@mui/material";

const mdTheme = createTheme();

function UserProfile() {
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
          <Paper
            sx={{
              dispaly: "flex",
              m: "10px auto",
              p: "10px",
              width: "75%",
              height: "75%",
            }}
            variant={"elevation"}
          >
            <UserForm />
          </Paper>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default UserProfile;
