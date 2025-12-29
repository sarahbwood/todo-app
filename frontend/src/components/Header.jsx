import { AppBar, Toolbar, Typography } from "@mui/material";
import LogoImage from "../assets/images/list.png";

function Header(props) {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <img src={LogoImage} alt="To Do List Logo" height="50px" />
        <Typography
          variant="h3"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          To Do List
        </Typography>
        <Typography variant="h5" component="div" sx={{ textAlign: "right" }}>
          {props.isLoggedIn ? `Hi, ${props.user.username}` : ""}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
