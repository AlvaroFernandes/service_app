import React, { useState } from "react";
import {
  TextField,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
  Button,
  FormHelperText,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //password validation
  let hasSixChar = password.length >= 6;
  let hasLowerChar = /(.*[a-z].*)/.test(password);
  let hasUpperChar = /(.*[A-Z].*)/.test(password);
  let hasNumChar = /(.*[0-9].*)/.test(password);
  let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(password);

  return (
    <div className="container mt-5 mb-5 col-10 col-sm-8 col-md-6 col-lg-6">
      <div className="text-center mb-5 alert alert-primary">
        <label htmlFor="" className="h2 mb-10">
          Sign Up
        </label>
        <div className="form-group mb-2">
          <TextField
            size="small"
            variant="outlined"
            className="form-control"
            label="Username"
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
        <div className="form-group mb-2">
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
                    onClick={(e) => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {password && (
            <div className="ml-1 text-justify" style={{ columns: 2 }}>
              <div>
                <small className={hasSixChar ? "text-success" : "text-danger"}>
                  at least 6 characters
                </small>
              </div>
              <div>
                <small
                  className={hasLowerChar ? "text-success" : "text-danger"}
                >
                  at least 1 lowercase letter
                </small>
              </div>
              <div>
                <small
                  className={hasUpperChar ? "text-success" : "text-danger"}
                >
                  at least 1 uppercase letter
                </small>
              </div>
              <div>
                <small className={hasNumChar ? "text-success" : "text-danger"}>
                  at least 1 number
                </small>
              </div>
              <div>
                <small
                  className={hasSpecialChar ? "text-success" : "text-danger"}
                >
                  at least 1 special character
                </small>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <FormControl variant="outlined" size="small" className="form-control">
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              label="Comfirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment>
                  <IconButton
                    edge="end"
                    onClick={(e) =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {password && confirmPassword && (
            <FormHelperText className="ml-1 mt-1">
              {password === confirmPassword ? (
                <spam className="text-success">Password matches</spam>
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
              !hasNumChar ||
              !hasSpecialChar
            }
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
