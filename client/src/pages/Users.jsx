import React from "react";
import MenuLayout from "../components/Menu";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Toolbar } from "@mui/material";

const mdTheme = createTheme();

function Users() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuLayout title={"Staff"} />

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
          <div className="searchAddArea">
            <SearchBar page={"staffs"} />
            <AddButton page={"staffs"} />
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Users;
