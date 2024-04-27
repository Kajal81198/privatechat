import { Logout } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Navbar(props) {
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Avatar variant="circular" src={props.profileData.picture} />

          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ ml: 2 }}
          >
            {props.profileData.given_name}
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="account"
            sx={{ mr: 2 }}
            onClick={() => props.logOut()}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
