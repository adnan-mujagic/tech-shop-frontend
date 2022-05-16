import React from "react";
import { Button as MaterialUIButton } from "@mui/material";
import styles from "./Button.module.scss";

function Button({ variant, text, disabled, onClickHandler, type }) {
  return (
    <div className={styles["button-wrapper"]}>
      <MaterialUIButton
        className={styles[`button-${variant}`]}
        variant={variant}
        disabled={disabled}
        onClick={onClickHandler}
        type={type}
      >
        {text}
      </MaterialUIButton>
    </div>
  );
}

export default Button;
