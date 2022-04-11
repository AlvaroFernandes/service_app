import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUser, reset } from "../features/users/usersSlice";
import {
  TextField,
  IconButton,
  Button,
  FormHelperText,
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Link,
  Grid,
  FormControl,
  FormControlLabel,
  Switch,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

const UserForm = () => {
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    address: "",
    salary: "",
    obs: "",
  });

  const { name, email, password, role, phone, address, salary, obs } = formData;

  let _id = "";
  if (user) {
    _id = user.user._id;
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      dispatch(getUser(_id));
    }
  });

  const { userInfo } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
  const handleEditChange = (e) => {
    e.preventDefault();

    setEdit(!edit);
  };
  const onChange = () => {};
  const onSubmit = () => {};

  return (
    <ThemeProvider theme={theme}>
      <Container component="div" maxWidth="xs">
        <FormGroup edge="end">
          <FormControlLabel
            control={<Switch onChange={handleEditChange} />}
            label="Edit"
            edge="end"
          />
        </FormGroup>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            User Profile
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  disabled={edit}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  value={userInfo.name}
                  autoFocus
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userInfo.email}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={userInfo.password}
                  onChange={onChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        edge="end"
                        onClick={(e) => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    ),
                  }}
                />
                {/* {password && (
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography
                        variant="caption"
                        color={hasSixChar ? "green" : "red"}
                      >
                        at least 6 characters
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="caption"
                        color={hasLowerChar ? "green" : "red"}
                      >
                        at least 1 lowercase character
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="caption"
                        color={hasUpperChar ? "green" : "red"}
                      >
                        at least 1 uppercase character
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="caption"
                        color={hasNumChar ? "green" : "red"}
                      >
                        at least 1 number
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        variant="caption"
                        color={hasSpecialChar ? "green" : "red"}
                      >
                        at least 1 special character
                      </Typography>
                    </Grid>
                  </Grid>
                )} */}
              </Grid>
              <Grid item xs={6}>
                <Checkbox />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserForm;
