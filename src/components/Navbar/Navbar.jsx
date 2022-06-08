import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, ButtonGroup } from "@mui/material";
import styles from "./Navbar.module.scss";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles["navbar-container"]}>
        <div className={styles.logo} onClick={() => navigate("/")}>
          Logo
        </div>
        <div className={styles.buttons}>
          <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button onClick={() => navigate("/register")}>Register</Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
