import React from "react";
import MenuLayout from "../components/Menu";
import CreatList from "../components/CreatList";
import SearchBar from "../components/SearchBar";
import AddButton from "../components/AddButton";
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
          <div className="searchAddArea">
            <SearchBar page={"jobs"} />
            <AddButton page={"jobs"} />
          </div>
          <Box
            component="div"
            sx={{
              backgroundColor: "white",
              flexGrow: 1,
              height: "75%",
              widht: "50%",
              margin: "10px auto",
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
