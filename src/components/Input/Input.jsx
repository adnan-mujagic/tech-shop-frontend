import React from "react";
import { TextField, styled } from "@mui/material";
import constants from "./../../api/constants";
import PropTypes from "prop-types";

const CustomInput = styled(TextField)({
  input: {
    "&::placeholder": {
      color: "white",
    },
  },
  "& label.Mui-focused": {
    color: constants.colors.input,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: constants.colors.input,
  },
  "& .MuiOutlinedInput-input": {
    color: constants.colors.inputHover,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: constants.colors.input,
    },
    "&:hover fieldset": {
      borderColor: constants.colors.inputHover,
    },
    "&.Mui-focused fieldset": {
      borderColor: constants.colors.inputHover,
    },
  },
});

function Input({ label, password, placeholder, onChange, margin, fullWidth }) {
  return (
    <CustomInput
      autoComplete="off"
      fullWidth={fullWidth}
      onChange={onChange}
      margin={margin}
      type={password ? "password" : "text"}
      label={label}
      placeholder={placeholder}
      InputLabelProps={{
        style: {
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: "100%",
          color: constants.colors.inputHover,
        },
      }}
    />
  );
}

Input.defaultProps = {
  fullWidth: false,
  margin: "",
  name: "",
  placeholder: "",
  label: "",
  password: false,
};

Input.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  password: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  margin: PropTypes.string,
};

export default Input;
