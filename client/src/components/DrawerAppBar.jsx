import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";
import { useDispatch, useSelector } from "react-redux";
import setLogOut from "../store/auth/actions";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact", "Login"];
const navItemsAuth = ["Home", "About", "Contact", "LogOut"];

function DrawerAppBar(props) {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const resultState = useSelector((state) => state.authSlice);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const GoToPageHome = () => {
    navigate("/");
  };
  const GoToPageAbout = () => {
    navigate("/about");
  };
  const GoToPageLogin = () => {
    navigate("/login");
  };
  const LogOut = () => {
    dispatch(setLogOut.setLogOut());
  };
  const enentButton = [
    GoToPageHome,
    GoToPageAbout,
    GoToPageHome,
    GoToPageLogin,
  ];
  const enentButtonAuth = [GoToPageHome, GoToPageAbout, GoToPageHome, LogOut];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (resultState != null && resultState.isAuthenticated === true) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [resultState]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      {!auth ? (
        <List>
          {navItems.map((item, id) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={enentButton[id]}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <List>
          {navItemsAuth.map((item, id) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                onClick={enentButtonAuth[id]}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  const CustomAppBar = styled(AppBar)({
    backgroundColor: "#3a3f47", // Кастомный AppBar
  });

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/*<AppBar component="nav" sx={{ bgcolor: '#3f51b5' }}> {/* Измените цвет здесь */}
      <CustomAppBar>
        {" "}
        {/* Цвет Хедера */}
        <Toolbar>
          {!auth ? (
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              {navItems.map((item, id) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={enentButton[id]}
                >
                  {item}
                </Button>
              ))}
            </Box>
          ) : (
            <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
              {navItemsAuth.map((item, id) => (
                <Button
                  key={item}
                  sx={{ color: "#fff" }}
                  onClick={enentButtonAuth[id]}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "none", md: "block" },
            }}
          >
            <img src={logo} className="App-logo" alt="logo" />
            Hilell UI test API-NEST.JS
            <img src={logo} className="App-logo" alt="logo" />
          </Typography>
          { auth && resultState?.userName ? (
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: "none", sm: "none", md: "block" },
              }}
            >
               Hello !!! {resultState.userName}
            </Typography>
          ) : (
            <></>
          )}
        </Toolbar>
      </CustomAppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
