import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Input from "../../components/Input";
import Button from "../../components/Button/Button";
import Api from "./../../api/api.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Register() {
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Api.post("register", formData)
      .then((response) => {
        setLoading(false);
        setHasError(false);
        setMessage(response.message);
        setShowSnackbar(true);
        localStorage.setItem("token", response.token);
      })
      .catch((err) => {
        setLoading(false);
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
      <h1 className={styles.heading}>Register</h1>
      <div className={styles["form-container"]}>
        <form className={styles["register-form"]} onSubmit={onSubmit}>
          <div className={styles.names}>
            <Input
              long
              name="first_name"
              onChange={onChange}
              placeholder="First name"
            />
            <Input
              long
              name="last_name"
              onChange={onChange}
              placeholder="Last name"
            />
          </div>
          <Input long name="email" onChange={onChange} placeholder="Email" />
          <Input
            long
            name="username"
            onChange={onChange}
            placeholder="Username"
          />
          <Input
            long
            name="password"
            onChange={onChange}
            placeholder="Password"
            password
          />

          <div className={styles["register-button"]}>
            <Button
              disabled={loading}
              loading={loading}
              type="submit"
              onClickHandler={onSubmit}
              variant="outlined"
              text="Register"
            />
            <div className={styles.login}>
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className={styles["login-btn"]}
              >
                Login here!
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
