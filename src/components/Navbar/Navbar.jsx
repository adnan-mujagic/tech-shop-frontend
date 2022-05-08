import React from "react";
import { Button } from "@mui/material";
import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <div>
      <div className={styles["navbar-container"]}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.buttons}>
          <Button variant="contained" className={styles.login}>
            Login
          </Button>
          <Button variant="outlined">Register</Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
