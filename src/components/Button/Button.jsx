import React from "react";
import { Button as MaterialUIButton } from "@mui/material";
import styles from "./Button.module.scss";

function Button({ variant, text, disabled }) {
  return (
    <div className={styles["button-wrapper"]}>
      <MaterialUIButton
        className={styles[`button-${variant}`]}
        variant={variant}
        disabled={disabled}
      >
        {text}
      </MaterialUIButton>
    </div>
  );
}

export default Button;
