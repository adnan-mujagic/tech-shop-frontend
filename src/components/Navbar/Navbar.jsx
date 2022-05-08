import React from "react";
import Button from "../Button";
import styles from "./Navbar.module.scss";

function Navbar() {
  return (
    <div>
      <div className={styles["navbar-container"]}>
        <div className={styles.logo}>Logo</div>
        <div className={styles.buttons}>
          <Button
            variant="contained"
            className={styles["amarweajklsdfl"]}
            text="Login"
          />
          <Button variant="outlined" text="Register" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
