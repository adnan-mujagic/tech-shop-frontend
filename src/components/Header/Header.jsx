import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Button, Drawer, IconButton, List, ListItem } from "@mui/material";
import { ChevronRight, Login, Logout } from "@mui/icons-material";
import styles from "./Header.module.scss";
import SidebarCart from "../SidebarCart";
import { admin } from "../../api/admin";
import { styled } from "@mui/material/styles";

const buttonStyle = {
  marginBottom: "16px",
};

const DrawerButton = styled(Button)({
  justifyContent: "flex-start",
  marginBottom: "16px",
});

function Header() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    admin().then((res) => {
      setIsAdmin(!!res?.admin);
    });
  }, []);

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

  return (
    <div className={styles.header}>
      <div className={styles["header-logo"]} onClick={() => navigate("/")}>
        Tech Shop
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <DrawerButton
                      variant="outlined"
                      style={buttonStyle}
                      onClick={() => {
                        navigate("/orderHistory");
                      }}
                    >
                      <ViewListIcon />
                      Order History
                    </DrawerButton>
                    {isAdmin && (
                      <DrawerButton
                        variant="outlined"
                        style={buttonStyle}
                        onClick={() => {
                          navigate("/admin");
                        }}
                      >
                        <GridViewIcon />
                        Admin Dashboard
                      </DrawerButton>
                    )}
                    <DrawerButton
                      variant="outlined"
                      style={buttonStyle}
                      onClick={() => {
                        localStorage.removeItem("session");
                        setDrawerOpen(false);
                      }}
                    >
                      <Logout />
                      Logout
                    </DrawerButton>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <DrawerButton
                      variant="outlined"
                      style={buttonStyle}
                      onClick={() => navigate("/login")}
                    >
                      <Login />
                      Log In
                    </DrawerButton>
                  </div>
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
