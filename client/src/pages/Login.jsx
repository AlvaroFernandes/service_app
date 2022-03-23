import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

//design
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

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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

    const userData = { email, password };

    dispatch(loginUser(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

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
            name="email"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="form-group mb-2">
          <FormControl variant="outlined" size="small" className="form-control">
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              valeu={password}
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
            variant="contained"
            disabled={!email || !password}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
