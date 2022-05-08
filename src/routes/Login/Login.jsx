import React from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import { Button } from "@mui/material";
import styles from "./Login.module.scss";

function Login() {
  return (
    <div>
      <Navbar />
      <h1 className={styles.heading}>Login</h1>
      <div className={styles["login-form"]}>
        <Input placeholder="Email" />
        <Input placeholder="Password" password />
        <Button variant="outlined" className={styles["login-button"]}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;
