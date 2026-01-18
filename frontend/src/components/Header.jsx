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
          <IconButton size="large">
            <AccountCircleOutlined fontSize="large" />
          </IconButton>
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
