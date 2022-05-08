import React from "react";
import PropTypes from "prop-types";
import styles from "./Input.module.scss";

function Input({ placeholder }) {
  return (
    <div>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
      ></input>
    </div>
  );
}

Input.defaultProps = {
  placeholder: "",
};

Input.propTypes = {
  placeholder: PropTypes.string,
};

export default Input;
