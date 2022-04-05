import React, { useState, useEffect } from "react";
import MenuLayout from "../components/Menu";
import CreatList from "../components/CreatList";
import SearchAddBar from "../components/SearchAddBar";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Toolbar } from "@mui/material";

const mdTheme = createTheme();

function Jobs() {
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <MenuLayout title={"Jobs"} />

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
          <SearchAddBar page={"jobs"} />
          <Box
            component="div"
            sx={{
              backgroundColor: "white",
              flexGrow: 1,
              height: "75%",
              widht: "50%",
              margin: "5em auto",
            }}
          >
            <CreatList page={"jobs"} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Jobs;
