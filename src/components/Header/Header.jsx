import React from "react";
import styles from "./Header.module.scss";
import MenuIcon from "@mui/icons-material/Menu";
import { Drawer } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

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

  return (
    <div className={styles.header}>
      <div className={styles["header-logo"]} onClick={() => navigate("/main")}>
        Logo
      </div>
      <div>
        <div className={styles["menu-button"]} onClick={toggleDrawer(true)}>
          <MenuIcon /> Menu
        </div>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
          <div className={styles["drawer-content"]}>Some Options</div>
        </Drawer>
      </div>
    </div>
  );
}

export default Header;
