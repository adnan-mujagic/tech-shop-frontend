import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import Api from "./../../api/api.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import styles from "./Login.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState();
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    Api.post("login", formData)
      .then((response) => {
        setHasError(false);
        setMessage("Login successful");
        setShowSnackbar(true);
        localStorage.setItem("token", response.token);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
        setMessage(err.message);
        setShowSnackbar(true);
      });
  };

  return (
    <div>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={hasError ? "error" : "success"}
          sx={{
            width: "100%",
            background: `${hasError ? "#f53d56" : "#78cece"}`,
          }}
        >
          {message}
        </Alert>
      </Snackbar>
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
