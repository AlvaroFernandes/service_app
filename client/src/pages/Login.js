import React, { useState, useContext } from "react";
import AuthService from "../service/AuthSercice";
import Message from "../components/Message";
import { AuthContext } from "../context/AuthContext";
import {
  TextField,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;

      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAutenticated(isAuthenticated);
        props.history.push("/jobs");
      } else setMessage(message);
    });
  };

  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-6">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2 mb-10">
          Login
        </label>
        <div className="form-group mb-2">
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Email"
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <FormControl variant="outlined" size="small" className="form-control">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={onChange}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    edge="end"
                    onClick={(e) => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="text-center mt-4">
          <Button
            onSubmit={onSubmit}
            variant="contained"
            disabled={!user.email || !user.password}
          >
            Submit
          </Button>
        </div>
      </div>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
