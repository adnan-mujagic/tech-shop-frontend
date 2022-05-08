import React from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import styles from "./Login.module.scss";

function Login() {
  return (
    <div>
      <Navbar />
      <div className={styles["login-form"]}>
        <Input placeholder="Email" />
      </div>
    </div>
  );
}

export default Login;
