import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

function Input({ placeholder, password }) {
  return (
    <div>
      <input
        type={password ? "password" : "text"}
        className={styles.input}
        placeholder={placeholder}
      ></input>
    </div>
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
