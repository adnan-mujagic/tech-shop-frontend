import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Drawer, IconButton, List, ListItem } from "@mui/material";
import { ChevronRight, Login, Logout } from "@mui/icons-material";
import styles from "./Header.module.scss";
import SidebarCart from "../SidebarCart";

function Header() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (shouldOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(shouldOpen);
  };

  const isLoggedIn = () => localStorage.getItem("session") !== null;

  const handleRemove = (event, item) => {
    console.log("Clicked");
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (item.amount === 1) {
      delete cart[item._id];
    } else {
      cart[item._id] = { ...cart[item._id], amount: item.amount - 1 };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className={styles.header}>
      <div className={styles["header-logo"]} onClick={() => navigate("/")}>
        Quiet Depths
      </div>
      <div>
        <div className={styles["menu-button"]} onClick={toggleDrawer(true)}>
          <MenuIcon /> Menu
        </div>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div className={styles["drawer-content"]}>
            <IconButton color="primary" onClick={toggleDrawer(false)}>
              <ChevronRight />
            </IconButton>
            <List>
              <ListItem>
                {isLoggedIn() ? (
                  <Button
                    sx={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    variant="outlined"
                    onClick={() => {
                      localStorage.removeItem("session");
                      setDrawerOpen(false);
                    }}
                  >
                    <Logout sx={{ marginRight: "8px" }} /> Logout
                  </Button>
                ) : (
                  <Button
                    sx={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    variant="outlined"
                    onClick={() => navigate("/login")}
                  >
                    <Login sx={{ marginRight: "8px" }} /> Log In
                  </Button>
                )}
              </ListItem>
            </List>
            <SidebarCart />
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default Header;
