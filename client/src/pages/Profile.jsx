import React, { useEffect } from "react";
import MenuLayout from "../components/Menu";
import UserForm from "../components/UserForm";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Paper, Toolbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUser, reset } from "../features/users/usersSlice";

const mdTheme = createTheme();

function UserProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { userInfo, isLoading, isError, message } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getUser(user._id));

    return () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch]);

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
