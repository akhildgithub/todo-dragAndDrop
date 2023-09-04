import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import avatarImage from "../assets/avatar_img.jpeg";
import { Avatar, Button, Chip, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "../App.css";
import CreateTask from "./CreateTask";

export default function Navbar() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const settings = ["Profile", "Dashboard", "Logout"];
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isHovered, setIsHovered] = useState(false);
  const background_color = isHovered
    ? "#0384a3!important"
    : "#0d93b3!important";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ backgroundColor: "silver" }}>
        <Toolbar>
          <Button
            onClick={handleOpen}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
              color: "white",
              mr: 2,
              display: "flex",
              border: "0px",
              borderRadius: "30px",
              padding: "6px 13px",
              background: background_color,
              textTransform: "capitalize",
              fontSize: "15px",
            }}
          >
            <AddIcon sx={{ mr: 1 }} /> Create Task
          </Button>

          <Box sx={{ flexGrow: 1 }} />
          <Chip
            className="noPhoneMode"
            variant="outlined"
            avatar={
              <>
                <span
                  style={{
                    background: "white",
                    color: "black",
                    fontSize: "15px",
                    padding: "5px 15px",
                    borderRadius: "15px",
                    paddingRight: "40px",
                  }}
                >
                  Akhil Dharavath | Senior Developer
                </span>
                <Avatar
                  sx={{ marginLeft: "-30px", width: "50px", height: "50px" }}
                >
                  <img
                    src={avatarImage}
                    alt="Profile"
                    width={55}
                    style={{ marginTop: "5px" }}
                  />
                </Avatar>
              </>
            }
          />
          <Box sx={{ flexGrow: 0 }} className="noTabMode phoneMode">
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mt: 2 }}>
                <Avatar alt="Akhil" src={avatarImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {openDialog && (
        <CreateTask
          open={openDialog}
          handleClose={handleClose}
        />
      )}
    </Box>
  );
}
