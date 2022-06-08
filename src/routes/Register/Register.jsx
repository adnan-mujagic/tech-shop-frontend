import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { Button } from "@mui/material";
import Input from "../../components/Input";
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

      <div className={styles["form-container"]}>
        <form
          autoComplete="off"
          className={styles["register-form"]}
          onSubmit={onSubmit}
        >
          <h1 className={styles.heading}>Register</h1>
          <Input
            fullWidth
            margin="dense"
            name="first_name"
            onChange={onChange}
            label="First name"
            placeholder="First name"
          />
          <Input
            fullWidth
            margin="dense"
            name="last_name"
            onChange={onChange}
            label="Last name"
            placeholder="Last name"
          />
          <Input
            fullWidth
            margin="dense"
            name="email"
            onChange={onChange}
            label="Email"
            placeholder="Email"
          />
          <Input
            fullWidth
            margin="dense"
            name="username"
            onChange={onChange}
            label="Username"
            placeholder="Username"
          />
          <Input
            fullWidth
            margin="dense"
            name="password"
            onChange={onChange}
            label="Password"
            placeholder="Password"
            password
          />

          <div className={styles["register-button"]}>
            <Button
              variant="outlined"
              disabled={loading}
              type="submit"
              onClick={onSubmit}
            >
              Register
            </Button>

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
