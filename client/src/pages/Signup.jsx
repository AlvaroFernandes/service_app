import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//design
import {
  TextField,
  InputAdornment,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

//api functions
import { register } from "../api/user";

const Signup = () => {
  const history = useNavigate();
  //states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //password validation
  let hasSixChar = password.length >= 6;
  let hasLowerChar = /(.*[a-z].*)/.test(password);
  let hasUpperChar = /(.*[A-Z].*)/.test(password);
  let hasNumber = /(.*[0-9].*)/.test(password);
  let hasSpecialChar = /(.*[^a-zA-z0-9].*)/.test(password);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await register({ userName, email, password });
      if (res.error) toast.error(res.error);
      else {
        toast.success(res.message);
        //redirect to login
        history.replace("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-5">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2">
          Sign Up
        </label>

        <div className="form-group mb-2">
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group mb-2">
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <FormControl variant="outlined" size="small" className="form-control">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {password && (
            <div className="ml-1" style={{ columns: 2 }}>
              <div>
                {hasSixChar ? (
                  <spam className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>at least 6 characters</small>
                  </spam>
                ) : (
                  <spam className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>at least 6 characters</small>
                  </spam>
                )}
              </div>
              <div>
                {hasLowerChar ? (
                  <spam className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>one lower case letter</small>
                  </spam>
                ) : (
                  <spam className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>one lower case letter</small>
                  </spam>
                )}
              </div>
              <div>
                {hasUpperChar ? (
                  <spam className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>one upper case letter</small>
                  </spam>
                ) : (
                  <spam className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>one upper case letter</small>
                  </spam>
                )}
              </div>
              <div>
                {hasNumber ? (
                  <spam className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>one number</small>
                  </spam>
                ) : (
                  <spam className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>one number</small>
                  </spam>
                )}
              </div>
              <div>
                {hasSpecialChar ? (
                  <spam className="text-success">
                    <CheckCircleIcon className="mr-1" fontSize="small" />
                    <small>one special characters</small>
                  </spam>
                ) : (
                  <spam className="text-danger">
                    <CancelIcon className="mr-1" fontSize="small" />
                    <small>one special characters</small>
                  </spam>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="form-group mt-2">
          <TextField
            size="small"
            type="password"
            variant="outlined"
            className="form-control"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {password && confirmPassword && (
            <FormHelperText className="ml-1 mt-1">
              {password === confirmPassword ? (
                <span className="text-success">Password match</span>
              ) : (
                <span className="text-danger">Password does not match</span>
              )}
            </FormHelperText>
          )}
        </div>
        <div className="text-center mt-4">
          <Button
            variant="contained"
            disabled={
              !userName ||
              !email ||
              !password ||
              !confirmPassword ||
              password !== confirmPassword ||
              !hasSixChar ||
              !hasLowerChar ||
              !hasUpperChar ||
              !hasNumber ||
              !hasSpecialChar
            }
            onClick={handleRegister}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
