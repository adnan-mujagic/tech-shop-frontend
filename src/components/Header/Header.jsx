import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Autocomplete,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { ChevronRight, Login, Logout } from "@mui/icons-material";
import { getProducts } from "./../../api/products";
import styles from "./Header.module.scss";
import SidebarCart from "../SidebarCart";

function Header() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const handleChange = () => {
    if (search.length > 3) {
      getProducts({ page: 1, pageSize: 10, search: search }).then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    }
  };

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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Button
                      style={{
                        width: "100%",
                        textAlign: "left",
                        marginBottom: "16px",
                      }}
                      variant="outlined"
                      onClick={() => {
                        navigate("/orderHistory");
                      }}
                    >
                      Order History
                    </Button>
                    <Button
                      style={{
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
                  </div>
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
