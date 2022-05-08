import React from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import styles from "./Login.module.scss";

function Login() {
  return (
    <div>
      <Navbar />
      <h1 className={styles.heading}>Login</h1>
      <div className={styles["login-form"]}>
        <Input placeholder="Email" />
        <Input placeholder="Password" password />
        <div className={styles["login-button"]}>
          <Button variant="outlined" text="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
