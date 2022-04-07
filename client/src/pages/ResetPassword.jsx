import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { resetPassword, reset } from "../features/auth/authSlice";
//design
import {
  TextField,
  Button,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  Box,
  Grid,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutLinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const params = useParams();
  const resetToken = params.resetToken;

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { password, confirmPassword } = formData;

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  let hasSixChar = password.length >= 6;
  let hasLowerChar = /(.*[a-z].*)/.test(password);
  let hasUpperChar = /(.*[A-Z].*)/.test(password);
  let hasNumChar = /(.*[0-9].*)/.test(password);
  let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      password,
      resetToken,
    };

    console.log(userData);

    dispatch(resetPassword(userData));
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secundary.main" }}>
            <LockOutLinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={password}
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
              {password && (
                <Grid container spacing={1}>
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
              )}
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <TextField
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={onChange}
              />
              {password && confirmPassword && (
                <FormHelperText className="ml-1 mt-1">
                  {password === confirmPassword ? (
                    <Typography color="green" variant="caption">
                      Password matches
                    </Typography>
                  ) : (
                    <Typography variant="caption" color="red">
                      Password does not match
                    </Typography>
                  )}
                </FormHelperText>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!password}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ResetPassword;
