import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  ClickAwayListener,
  Drawer,
  IconButton,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { ChevronRight, Login, Logout } from "@mui/icons-material";
import { getProducts } from "./../../api/products";
import styles from "./Header.module.scss";
import SidebarCart from "../SidebarCart";
import { admin } from "../../api/admin";
import { styled } from "@mui/material/styles";
import constants from "../../api/constants";
import Input from "../Input/Input";
import SearchProductList from "../SearchProductList";

const buttonStyle = {
  marginBottom: "16px",
};

const DrawerButton = styled(Button)({
  justifyContent: "flex-start",
  marginBottom: "16px",
});

function Header() {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      getProducts({ page: 1, pageSize: 10, search: search }).then((res) => {
        let options = res.data;
        options.forEach((option) => (option["label"] = option["name"]));
        setProducts(options);
      });
    } else {
      setProducts([]);
    }
  };

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

  const handleClickAway = () => {
    console.log("HELLLOOOSFD");
    setSearchFocused(false);
  };

  const isLoggedIn = () => localStorage.getItem("session") !== null;

  return (
    <div className={styles.header}>
      <div className={styles["header-logo"]} onClick={() => navigate("/")}>
        Tech Shop
      </div>
      <div className={styles["header-right"]}>
        <div>
          <ClickAwayListener
            onClickAway={handleClickAway}
            children={
              <Input
                value={search}
                onFocus={() => setSearchFocused(true)}
                onChange={handleChange}
              />
            }
          ></ClickAwayListener>
          {products.length > 0 && searchFocused && (
            <SearchProductList products={products} />
          )}
        </div>
        <div className={styles["menu-button"]} onClick={toggleDrawer(true)}>
          <MenuIcon style={{ marginRight: "10px" }} /> Menu
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
