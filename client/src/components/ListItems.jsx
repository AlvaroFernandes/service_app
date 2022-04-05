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

export const ListItems = (userRole) => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  if (!user) {
    navigate("/login");
  }

  const role = userRole.role;

  const handleClickMenu = (e, props) => {
    e.preventDefault();
    const name = props;
    console.log(name);
    if (name === "dashboard") {
      navigate("/");
    } else {
      const path = "/" + name;
      navigate(path);
    }
  };
  return (
    <>
      {role === "admin" ? (
        <>
          <ListItemButton onClick={(e) => handleClickMenu(e, "dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={(e) => handleClickMenu(e, "jobs")}>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Jobs" />
          </ListItemButton>
          <ListItemButton onClick={(e) => handleClickMenu(e, "clients")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Clients" />
          </ListItemButton>
          <ListItemButton onClick={(e) => handleClickMenu(e, "users")}>
            <ListItemIcon>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Staff" />
          </ListItemButton>
        </>
      ) : (
        <>
          <ListItemButton onClick={(e) => handleClickMenu(e, "dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={(e) => handleClickMenu(e, "jobs")}>
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
