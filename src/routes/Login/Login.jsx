import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import Api from "./../../api/api.js";
import styles from "./Login.module.scss";

function Login() {
  const [formData, setFormData] = useState();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    Api.post("login", formData)
      .then((response) => {
        localStorage.setItem("token", response.token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Navbar />
      <h1 className={styles.heading}>Login</h1>
      <div className={styles["login-form"]}>
        <Input name="email" onChange={onChange} placeholder="Email" />
        <Input
          name="password"
          onChange={onChange}
          placeholder="Password"
          password
        />
        <div className={styles["login-button"]}>
          <Button onClickHandler={onSubmit} variant="outlined" text="Login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
