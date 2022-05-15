import React from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import Api from "./../../api/api.js";
import styles from "./Login.module.scss";

function Login() {
  const formData = {
    email: "mujagicamar@gmail.coms",
    password: "Test123!",
  };

  const sendRequest = () => {
    Api.post("login", formData)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <h1 className={styles.heading}>Login</h1>
      <div className={styles["login-form"]}>
        <Input placeholder="Email" />
        <Input placeholder="Password" password />
        <div className={styles["login-button"]}>
          <Button
            onClickHandler={sendRequest}
            variant="outlined"
            text="Login"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
