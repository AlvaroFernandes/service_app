import React from "react";
import { styled, alpha } from "@mui/material/styles";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const ButtonArea = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginTop: 10,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const AddButton = (page) => {
  let str = page.page;
  str = str.charAt(0).toUpperCase() + str.slice(1);
  str = str.slice(0, -1);

  const buttonLabel = `Add ${str}`;

  const addClient = () => {};
  return (
    <ButtonArea>
      <Button onClick={addClient} variant="contained" endIcon={<AddIcon />}>
        {buttonLabel}
      </Button>
    </ButtonArea>
  );
};

export default AddButton;
