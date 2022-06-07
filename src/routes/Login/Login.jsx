import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Button } from "@mui/material";
import Input from "../../components/Input";
import Api from "./../../api/api.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [formData, setFormData] = useState({ password: "", email: "" });
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

    Api.post("login", formData)
      .then((response) => {
        setLoading(false);
        setHasError(false);
        setMessage("Login successful");
        setShowSnackbar(true);
        localStorage.setItem(
          "session",
          JSON.stringify({ token: response.token })
        );
        navigate("/dashboard");
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

      <div className={styles["login-container"]}>
        <form className={styles["login-form"]} onSubmit={onSubmit}>
          <h1 className={styles.heading}>Login</h1>
          <Input
            onChange={onChange}
            placeholder="Email"
            label="Email"
            margin="normal"
          />
          <Input
            onChange={onChange}
            placeholder="Password"
            label="Password"
            password
            margin="normal"
          />

          <div className={styles["login-button"]}>
            <Button
              variant="outlined"
              type="submit"
              onClick={onSubmit}
              size="large"
              disabled={loading}
            >
              Login
            </Button>
            <div className={styles.register}>
              Don't have an account?
              <span
                onClick={() => navigate("/register")}
                className={styles["register-btn"]}
              >
                Register here!
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
