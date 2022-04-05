import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { userId } = useParams();
  const dispatch = useDispatch();

  console.log(userId);

  return <div>UserForm</div>;
};

export default UserForm;
