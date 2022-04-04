import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const ListItems = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const role = user.role;

  const handleClickMenu = (e) => {
    e.preventDefault();

    const name = e.target.name;
    if (name === "dashboard") {
      navigate("/");
    }
    const path = "/" + name;
    navigate(path);
  };
  return (
    <>
      {role === "admin" ? (
        <>
          <ListItemButton name="dashboard" onClick={handleClickMenu}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={handleClickMenu}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItemButton>
          <ListItemButton onClick={handleClickMenu}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItemButton>
          <ListItemButton onClick={handleClickMenu}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItemButton>
        </>
      ) : (
        <>
          <ListItemButton>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItemButton>
        </>
      )}
    </>
  );
};

export default ListItems;
