import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

function Input({ onChange, name, placeholder, password }) {
  return (
    <input
      onChange={onChange}
      name={name}
      type={password ? "password" : "text"}
      className={styles.input}
      placeholder={placeholder}
    ></input>
  );
}

Input.defaultProps = {
  placeholder: "",
  password: false,
};

Input.propTypes = {
  placeholder: PropTypes.string,
  password: PropTypes.bool,
};

export default Input;
