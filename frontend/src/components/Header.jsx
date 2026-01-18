import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";
import LogoImage from "../assets/images/list.png";

function Header(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: "blur(25px)" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <img src={LogoImage} alt="To Do List Logo" height="50px" />
        <Typography
          variant="h3"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          To Do List
        </Typography>
        {props.isLoggedIn && (
          <div>
            <IconButton
              id="menu-button"
              size="large"
              aria-controls={openMenu ? "profile-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={handleMenuClick}
            >
              <AccountCircleOutlined fontSize="large" />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleMenuClose}
              slotProps={{
                list: {
                  "aria-labelledby": "menu-button",
                },
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#7f4211",
                  minWidth: "120px",
                },
              }}
            >
              <MenuItem>Logout</MenuItem>
            </Menu>
          </div>
        )}
        <Typography variant="h5" component="div" sx={{ textAlign: "right" }}>
          {props.isLoggedIn
            ? `Hi, ${
                props.user.username.slice(0, 1).toUpperCase() +
                props.user.username.slice(1)
              }`
            : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
