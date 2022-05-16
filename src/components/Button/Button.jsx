import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Button as MaterialUIButton } from "@mui/material";
import styles from "./Button.module.scss";
import { margin } from "@mui/system";

function Button({ loading, variant, text, disabled, onClickHandler, type }) {
  return (
    <div className={styles["button-wrapper"]}>
      <MaterialUIButton
        className={styles[`button-${variant}`]}
        variant={variant}
        disabled={disabled}
        onClick={onClickHandler}
        type={type}
      >
        {loading && (
          <CircularProgress
            sx={{ color: "#f53d56", marginRight: "10px" }}
            size={20}
          />
        )}
        {text}
      </MaterialUIButton>
    </div>
  );
}

export default Button;
