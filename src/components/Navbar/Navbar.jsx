import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
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
          <Button
            variant="contained"
            text="Login"
            onClickHandler={() => navigate("/login")}
          />
          <Button
            onClickHandler={() => navigate("/register")}
            variant="outlined"
            text="Register"
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
